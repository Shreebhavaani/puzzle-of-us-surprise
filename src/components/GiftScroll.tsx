
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Gift, Star, Music, Camera, Coffee, Book, Gamepad2, Plane, Sun, Moon, Sparkles, Crown, Diamond, Flower, Cake, PartyPopper, Zap, Rainbow } from 'lucide-react';

const gifts = [
  { id: 1, icon: Heart, title: "First Day We Met", description: "Remember that awkward hello? Best accident ever!", color: "from-pink-400 to-red-400" },
  { id: 2, icon: Coffee, title: "Coffee Shop Adventures", description: "Where we discovered we both hate pineapple on pizza", color: "from-amber-400 to-orange-400" },
  { id: 3, icon: Music, title: "Our Playlist", description: "Every song that made us laugh until we cried", color: "from-purple-400 to-pink-400" },
  { id: 4, icon: Camera, title: "Photo Booth Chaos", description: "Making weird faces and pretending to be models", color: "from-blue-400 to-cyan-400" },
  { id: 5, icon: Book, title: "Late Night Conversations", description: "Solving the world's problems at 3 AM", color: "from-green-400 to-teal-400" },
  { id: 6, icon: Gamepad2, title: "Gaming Sessions", description: "You winning... always. But I'm getting better!", color: "from-indigo-400 to-purple-400" },
  { id: 7, icon: Plane, title: "Dream Trip Plans", description: "All those places we'll visit when we're rich and famous", color: "from-cyan-400 to-blue-400" },
  { id: 8, icon: Sun, title: "Beach Day Memories", description: "Sunscreen, sand everywhere, and perfect weather", color: "from-yellow-400 to-orange-400" },
  { id: 9, icon: Moon, title: "Midnight Food Runs", description: "Because normal dinner time is overrated", color: "from-purple-500 to-indigo-500" },
  { id: 10, icon: Sparkles, title: "Inside Jokes", description: "That thing we say that makes everyone else confused", color: "from-pink-500 to-purple-500" },
  { id: 11, icon: Crown, title: "Your Birthday Crown", description: "Because you're literally royalty today", color: "from-yellow-500 to-amber-500" },
  { id: 12, icon: Diamond, title: "Precious Moments", description: "All the times you made ordinary days extraordinary", color: "from-cyan-500 to-blue-500" },
  { id: 13, icon: Flower, title: "Growth Together", description: "How we've both bloomed into better people", color: "from-green-500 to-emerald-500" },
  { id: 14, icon: Cake, title: "Birthday Wishes", description: "Here's to another year of amazing adventures!", color: "from-pink-500 to-red-500" },
  { id: 15, icon: PartyPopper, title: "Celebration Mode", description: "Every day with you feels like a party", color: "from-red-500 to-pink-500" },
  { id: 16, icon: Star, title: "Surprise Moments", description: "Like this website! Got you, didn't I?", color: "from-purple-500 to-pink-500" },
  { id: 17, icon: Rainbow, title: "After Every Storm", description: "You always help me find the rainbow", color: "from-indigo-500 to-purple-500" },
  { id: 18, icon: Star, title: "Wish Upon A Star", description: "That our friendship lasts forever and always", color: "from-blue-500 to-indigo-500" },
  { id: 19, icon: Zap, title: "Electric Connection", description: "The energy between us that never fades", color: "from-yellow-500 to-red-500" },
  { id: 20, icon: Gift, title: "The Best Gift", description: "Having you as my best friend. Happy Birthday! 🎂", color: "from-rose-500 to-pink-500" }
];

export const GiftScroll = () => {
  const [openGift, setOpenGift] = useState<number | null>(null);

  return (
    <div className="max-w-6xl mx-auto mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          ✨ Your Digital Gift Collection ✨
        </h2>
        <p className="text-gray-600">
          Click each gift to unwrap a special memory! 🎁
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gifts.map((gift) => {
          const IconComponent = gift.icon;
          return (
            <Card
              key={gift.id}
              className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-pink-300 group"
              onClick={() => setOpenGift(openGift === gift.id ? null : gift.id)}
            >
              <CardHeader className="text-center pb-2">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${gift.color} flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-800">
                  Gift #{gift.id}
                </CardTitle>
              </CardHeader>
              
              {openGift === gift.id && (
                <CardContent className="animate-fade-in">
                  <h3 className="font-bold text-purple-600 mb-2">{gift.title}</h3>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {gift.description}
                  </CardDescription>
                </CardContent>
              )}
              
              {openGift !== gift.id && (
                <CardContent className="text-center">
                  <p className="text-gray-500 text-sm">Click to unwrap! 🎁</p>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-12 p-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
        <h3 className="text-2xl font-bold text-purple-600 mb-4">
          🎂 Happy Birthday, Best Friend! 🎂
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
          Thank you for being the most amazing friend anyone could ask for. 
          Here's to another year of incredible memories, inside jokes, and adventures together! 
          You deserve all the happiness in the world. 💕
        </p>
      </div>
    </div>
  );
};
