
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";

interface PanditCardProps {
  pandit: any;
  onClick: () => void;
}

const PanditCard = ({ pandit, onClick }: PanditCardProps) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow border-orange-200"
      onClick={onClick}
    >
      <div className="aspect-video relative bg-orange-100 overflow-hidden">
        {pandit.profilePictureUrl ? (
          <img 
            src={pandit.profilePictureUrl}
            alt={pandit.fullName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-orange-800 text-3xl">
            {pandit.fullName.charAt(0)}
          </div>
        )}
        {pandit.featured && (
          <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-orange-800">{pandit.fullName}</h3>
        
        <div className="flex items-center mt-1 mb-2">
          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < pandit.rating ? 'fill-yellow-500' : ''}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-1">({pandit.reviewCount})</span>
        </div>
        
        <div className="flex items-start mb-2">
          <MapPin className="h-4 w-4 text-orange-600 mt-0.5 mr-1 shrink-0" />
          <span className="text-sm text-gray-600">{pandit.city}, {pandit.state}</span>
        </div>
        
        <p className="text-sm text-gray-700 line-clamp-2 mb-3">{pandit.bio}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            {pandit.experienceYears} years exp.
          </span>
          <Button 
            size="sm" 
            className="bg-orange-600 hover:bg-orange-700"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PanditCard;
