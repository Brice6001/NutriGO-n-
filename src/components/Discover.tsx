import { Award, ArrowRight, Calendar, Utensils, Truck, Activity, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { ScreenType } from '../types';

interface DiscoverProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function Discover({ onNavigate }: DiscoverProps) {
  return (
    <div className="space-y-16 animate-fade-in pb-12">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center max-w-4xl mx-auto pt-6 space-y-6">
        <span className="inline-flex bg-[#cdeb7e] text-[#536b06] px-4 py-1.5 rounded-full font-sans text-xs font-bold shadow-xs">
          Voted #1 Nutrition App 2024
        </span>
        
        <h1 className="font-display font-black text-4xl md:text-6xl text-[#1a1c18] leading-[1.1] tracking-tight">
          Healthy eating <span className="text-[#3c6839]">made simple</span>
        </h1>
        
        <p className="text-secondary-foreground text-[#42493f] text-base md:text-lg max-w-2xl leading-relaxed">
          Discover personalized nutrition plans and chef-prepared meals delivered directly to your door. NutriGo balances your lifestyle with expert-led wellness tracking.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md pt-2">
          <button
            onClick={() => onNavigate('meals')}
            className="bg-[#3c6839] hover:bg-opacity-95 text-[#ffffff] font-semibold text-sm px-8 py-4 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex-1"
          >
            Get Started Today
          </button>
          <button
            onClick={() => onNavigate('plan')}
            className="border-2 border-[#466365] text-[#466365] hover:bg-[#edefe7] font-semibold text-sm px-8 py-4 rounded-xl transition-transform active:scale-95 cursor-pointer flex-1"
          >
            Configure My Plan
          </button>
        </div>

        {/* Large Aesthetic Image Container */}
        <div className="w-full pt-8 h-[240px] sm:h-[400px]">
          <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-xs border border-[#c2c9bc]/30">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhd9lrvYEf8kJ83rOCjAFAQ0TCKVfPrOW5gey_k8yopUS2eXnTT3Hmra8I2qJEgaapNDg6D4TByz3aiEvn-v_4QZGG2AkCJrFII6izy4AkIIr_3upMBRkLpkN8YiWSbYxHshHL7UBGWLKf8QMHKHG-YRCuMjj7ktTzQUGZ58pk7n2Z3vC-zMawjIBNU-h23ag4xJ0DD4kMH047nvL7KFLNvqvrmZM4THUAILXDKK4Hu7xSD7HNPl-QE9TsUEIlq-tCdOQOmBAk3g"
              alt="Healthy meal preparations"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="space-y-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-black text-[#1a1c18] tracking-tight">
              Tailored for your busy lifestyle
            </h2>
            <p className="text-[#42493f] text-sm md:text-base mt-1">
              We combine data science with culinary excellence to deliver a nutrition experience that actually sticks.
            </p>
          </div>
          <button
            onClick={() => onNavigate('meals')}
            className="text-sm font-bold text-[#3c6839] flex items-center gap-1 hover:underline cursor-pointer group hover:translate-x-0.5 transition-all"
          >
            Explore Nutritional Features <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6">
          
          {/* Card 1: Personalized Plans (Span 8) */}
          <div className="md:col-span-8 bg-[#f3f4ed] rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row gap-6 items-center overflow-hidden border border-[#c2c9bc]/25">
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 bg-[#93c48b] rounded-xl flex items-center justify-center text-[#265225] shadow-xs">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#1a1c18]">
                Personalized Nutrition Plans
              </h3>
              <p className="text-sm text-[#42493f] leading-relaxed">
                Our smart algorithms create a dynamic macroscopic profile completely adjusted to your goals, biological metrics, and daily physical activity levels.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-[#cdeb7e] text-[#536b06] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Bio-Sync Tech
                </span>
                <span className="bg-[#cdeb7e] text-[#536b06] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Daily Adjusting
                </span>
              </div>
            </div>
            
            {/* Phone visualization mockup */}
            <div className="flex-1 h-56 sm:h-64 w-full relative rounded-2xl overflow-hidden shadow-xs border border-[#c2c9bc]/30">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJSDFEw9rdo5AKD8fsAxB1ez1z1V5CaUQ76YuVudDmbdwMdUpU3mqEw858xYif1B9MS1SZDxmZksHLFeovpO2puL7X6AkCEOqZen6d2bwqpI_iCauC1192KpH2hbekmWXbDRiiYup3GGAv7yF0iy7NLOCLI5Iw2LpKopMfAq-8eRum_8-9q6doYBrUti9cUokOyOY9SQP7eQlUc1Tr8O9W0YAD-QJb20IQiJxEouxH0Dvtyzc43YBL1J9UO1QyyDmocgzk_PgHMA"
                alt="NutriGo high-tech smartphone tracking interface"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Card 2: Chef Prepared (Span 4) */}
          <div className="md:col-span-4 bg-[#3c6839] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-[#ffffff] shadow-xs">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#cdeb7e]">
                Chef-Prepared Meals
              </h3>
              <p className="text-sm text-[#f9faf3]/95 leading-relaxed">
                Premium gourmet nutrition crafted and cooked in small batches by world-class chefs utilizing local organic suppliers.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              {/* Overlapping chef avatars */}
              <div className="flex items-center -space-x-3 mb-3">
                <img
                  className="w-10 h-10 rounded-full border-2 border-[#3c6839] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuATVfZlMeoWPTp92uCtf5rLcsU27c9Uq5NGmNcFu9JLU5wM7rc76_-Zhwyf2KbNtowR6FmUHKAWepHJkGez_GxpBqReY7RpSLYfVbpAZ98lFLsr9QMwpE7YGJLTEbtraptVp-Wq1Hnl7LqIom-4XnqgBPh0P8HfFE4Sm9qZCrSiKwdbLLsOFWs3jlWGpS8HsYt64Di5mj72WlhNgTtMaby1FkXNO86jg5zu9r4hscPgkjmurGriq5kXy_ijWwVXyLHk4OFhfRha6g"
                  alt="Executive Chef"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-[#3c6839] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoiIP_AhAV5Ha8mc7zUZlP6JywbUvfi_wR7f1l5hH1kro_jxKaWE-OpMxH8EpS9TIWiCfQe_XUd3nNHrDXRrGzqob0prdlmmjliBVJ5u92iLy0TpM8npLUDlJ9OMBc5KcxhiCKn00HA_ki-7f3MXw0kWASVNHKbBm2pVySVD52n_qMKl0O81QmPv3WeyI0AaBnWm25lf4sn8E98NZBDBfI3QFwmp183EJGVYTxBjNNYS9QJjizVqJGeqJk-A0t_kr-ObtChnFYow"
                  alt="Sous Chef"
                />
                <div className="w-10 h-10 rounded-full bg-[#cdeb7e] text-[#1a1c18] border-2 border-[#3c6839] flex items-center justify-center text-xs font-black">
                  +12
                </div>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#d0ee81]">
                Expert Culinary Team
              </p>
            </div>
          </div>

          {/* Card 3: Seamless Delivery (Span 4) */}
          <div className="md:col-span-4 bg-[#e7e9e2] rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-[#c2c9bc]/25">
            <div className="w-12 h-12 bg-[#3c6839] rounded-xl flex items-center justify-center text-white shadow-xs">
              <Truck className="w-6 h-6" />
            </div>
            <div className="mt-6">
              <h3 className="font-display text-xl font-bold text-[#1a1c18] mb-1">
                Seamless Delivery
              </h3>
              <p className="text-xs text-[#42493f] leading-relaxed">
                Scheduled perfectly to your doorstep in fully recyclable, thermal-insulated containers to preserve lock-in peak freshness.
              </p>
            </div>
          </div>

          {/* Card 4: Integrated Tracking (Span 8) */}
          <div className="md:col-span-8 bg-[#ffffff] rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row gap-6 items-center border border-[#c2c9bc]/25 shadow-xs">
            <div className="flex-1 space-y-3">
              <div className="w-12 h-12 bg-[#f0a1bd]/30 rounded-xl flex items-center justify-center text-[#8a4a63] shadow-xs">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#1a1c18]">
                Integrated Smart Tracking
              </h3>
              <p className="text-xs text-[#42493f] leading-relaxed">
                Connect your existing wearables dynamically! Instantly synchronize calories burned to adjust macro budgets.
              </p>
              <button className="text-xs font-bold text-[#3c6839] hover:underline cursor-pointer pt-1 flex items-center gap-1 active:scale-95 transition-all">
                Learn more about integration <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              <div className="bg-[#f3f4ed] p-4 rounded-2xl text-center">
                <p className="text-[#3c6839] font-display text-3xl font-black">84%</p>
                <p className="text-[10px] text-[#42493f] uppercase font-bold tracking-wider mt-1">Goal Success</p>
              </div>
              <div className="bg-[#f3f4ed] p-4 rounded-2xl text-center">
                <p className="text-[#8a4a63] font-display text-3xl font-black">2.4k</p>
                <p className="text-[10px] text-[#42493f] uppercase font-bold tracking-wider mt-1">Burned Kcal</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#f3f4ed] -mx-6 px-6 py-16">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-display text-2xl md:text-3xl font-black text-[#1a1c18]">
              Real stories from the NutriGo community
            </h2>
            <p className="text-[#42493f] text-sm md:text-base">
              Join over 50,000 active members who achieved balance, clarity and strength through smart nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#c2c9bc]/30 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-[#D0E562]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm font-medium italic text-[#1a1c18] leading-relaxed">
                    {t.quote}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-4 border-t border-[#c2c9bc]/20">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#93c48b] bg-[#e7e9e2] relative shadow-xs">
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-sm text-[#1a1c18]">
                      {t.author}
                    </h4>
                    <p className="text-[11px] text-[#72796e] font-semibold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
