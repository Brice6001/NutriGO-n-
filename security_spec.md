# Firebase Security Rules Specification for NutriGo

This document details the Zero-Trust security rules specifications (ABAC) protecting NutriGo's database, including data invariants, malicious "Dirty Dozen" payloads to block, and verification specifications.

## 1. Core Data Invariants

*   **Identity Sync**: Every custom user document path `/databases/$(database)/documents/users/{userId}` must only be read and written by the authenticated user matching `{userId}`.
*   **Immutable Identity fields**: The authenticated User UID cannot be changed, or spoofed (`incoming().userId == userId` and `incoming().userId == request.auth.uid`).
*   **Verified Users Only**: Reading and writing credentials must be verified using `request.auth.token.email_verified == true`.
*   **Format Constraints**: 
    *   Maximum string size limits to prevent Denial-of-Wallet space-poisoning.
    *   Daily time strings (e.g. `breakfastTime`) must match `hh:mm` or be 5 characters.
    *   Streak and numbers must be non-negative.
*   **Temporal Compliance**: `updatedAt` matches the exact server transaction date (`request.time`).

---

## 2. The "Dirty Dozen" Malicious Payloads

The following operations must return `PERMISSION_DENIED`:

### Payload 1: Unauthorized Profile Intrusion (Identity Spoofing)
*   **Scenario**: User `hacker123` attempts to write/read document `/users/alex456`.
*   **Result**: PermDenied (`request.auth.uid` doesn't match path).

### Payload 2: Self-Assigned Privilege Escalation
*   **Scenario**: User `alex456` attempts to set `"role": "admin"` or `"isAdmin": true` inside their document.
*   **Result**: PermDenied (Strict schema allows only certified properties; no extra keys).

### Payload 3: Unverified Email Login Bypass
*   **Scenario**: Sign-in token has `email_verified: false` but attempts profile update.
*   **Result**: PermDenied (Email must be verified).

### Payload 4: Ghost-Field Insertion (Shadow Update)
*   **Scenario**: User attempts a profile write containing `"isPro": true` or `"ghostField": "malicious"`.
*   **Result**: PermDenied (Key count or explicit key checks fail).

### Payload 5: Out of Bounds Consumption Goal
*   **Scenario**: User updates `"hydrationGoalMl": -500` or `"hydrationGoalMl": 1000000` (Denial of Wallet).
*   **Result**: PermDenied (Limits validation: `hydrationGoalMl` must be between $500$ and $20000$ ml).

### Payload 6: Spoofed Streak Value
*   **Scenario**: User attempts to raise `"wellnessStreak": -1` or `"wellnessStreak": 999999`.
*   **Result**: PermDenied (Streak must be between `0` and `31` or reasonable bounds).

### Payload 7: Client-Spoofed Timestamps
*   **Scenario**: User submits an update with a hardcoded old/future client-side `updatedAt` timestamp.
*   **Result**: PermDenied (`incoming().updatedAt` must equal `request.time`).

### Payload 8: Path Character Poisoning
*   **Scenario**: Attempt to create users document targeting user ID `../../system_admin`.
*   **Result**: PermDenied (Path variable checks failed).

### Payload 9: Malformed Meal Time String
*   **Scenario**: Submitting `"breakfastTime": "midnight-o-clock"`.
*   **Result**: PermDenied (Must be 5 characters and follow `^[0-2][0-9]:[0-5][0-9]$` regex format).

### Payload 10: Size-Poisoning Profile Names
*   **Scenario**: Writing a `"name"` field of length 2MB containing random noise.
*   **Result**: PermDenied (Must check that `name.size() <= 100`).

### Payload 11: Non-Owner Public Profile Index Scraping
*   **Scenario**: An authenticated user `user789` tries to perform a list/query fetch on all users' profile data.
*   **Result**: PermDenied (`resource.data.userId == request.auth.uid` is enforced).

### Payload 12: Overwriting Immutable Original Profile IDs
*   **Scenario**: Updating of existing document `/users/alex456` where the client payload has `"userId": "bob789"`.
*   **Result**: PermDenied (`incoming().userId == existing().userId`).
