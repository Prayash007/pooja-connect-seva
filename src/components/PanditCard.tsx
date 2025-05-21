
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";

interface PanditCardProps {
  pandit: {
    id: string;
    full_name: string;
    city: string;
    state: string;
    languages?: string[] | null;
    specializations?: string[] | null;
    experience_years?: number | null;
    bio?: string | null;
    rating?: number | null;
    review_count?: number | null;
    avatar_url?: string | null;
  };
  onClick?: () => void;
}

const PanditCard = ({ pandit, onClick }: PanditCardProps) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all cursor-pointer border-orange-200 dark:border-orange-800 bg-white dark:bg-gray-900"
      onClick={onClick}
    >
      <div className="flex p-4">
        <div className="h-24 w-24 rounded-full overflow-hidden bg-orange-100 dark:bg-orange-900 flex items-center justify-center mr-4 flex-shrink-0">
          {pandit.avatar_url ? (
            <img 
              src={pandit.avatar_url} 
              alt={pandit.full_name} 
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-4xl">🕉️</span>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-lg text-orange-800 dark:text-orange-400">{pandit.full_name}</h3>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{pandit.city}, {pandit.state}</span>
          </div>
          
          {pandit.rating !== null && (
            <div className="flex items-center mt-1">
              <span className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{pandit.rating?.toFixed(1)}</span>
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                ({pandit.review_count || 0} reviews)
              </span>
            </div>
          )}
          
          {pandit.experience_years && (
            <p className="mt-1 text-sm">
              <span className="font-medium">{pandit.experience_years}</span> years of experience
            </p>
          )}
        </div>
      </div>
      
      <CardContent className="border-t border-orange-100 dark:border-orange-900 pt-3 pb-4">
        {pandit.specializations && pandit.specializations.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Specializations:</h4>
            <div className="flex flex-wrap gap-1">
              {pandit.specializations.slice(0, 3).map((spec, index) => (
                <Badge key={index} variant="outline" className="bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800">
                  {spec}
                </Badge>
              ))}
              {pandit.specializations.length > 3 && (
                <Badge variant="outline" className="bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800">
                  +{pandit.specializations.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {pandit.bio && (
          <p className="mt-3 text-sm line-clamp-2 text-gray-600 dark:text-gray-300">
            {pandit.bio}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PanditCard;
