const GOOGLE_API_KEY = "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"; // Dummy key

export async function getAddressFromCoords(coords) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`);
    if (!response.ok) {
        throw new Error("Failed to fetch address. Please try again.");        
    }
    const data = await response.json();
    
    if (condition) {
        throw new Error(data.error_message);
    }
    return data.results[0].formatted_address;
}

/* https://developers.google.com/maps/documentation/geocoding/start

Below is a sample reverse geocoding response, in JSON:


{
   "plus_code" : {
      "compound_code" : "P27Q+MC New York, NY, USA",
      "global_code" : "87G8P27Q+MC"
   },
   "results" : [
      {
         "address_components" : [
            {
               "long_name" : "279",
               "short_name" : "279",
               "types" : [ "street_number" ]
            },
            {
               "long_name" : "Bedford Avenue",
               "short_name" : "Bedford Ave",
               "types" : [ "route" ]
            },
            {
               "long_name" : "Williamsburg",
               "short_name" : "Williamsburg",
               "types" : [ "neighborhood", "political" ]
            },
            {
               "long_name" : "Brooklyn",
               "short_name" : "Brooklyn",
               "types" : [ "political", "sublocality", "sublocality_level_1" ]
            },
            {
               "long_name" : "Kings County",
               "short_name" : "Kings County",
               "types" : [ "administrative_area_level_2", "political" ]
            },
            {
               "long_name" : "New York",
               "short_name" : "NY",
               "types" : [ "administrative_area_level_1", "political" ]
            },
            {
               "long_name" : "United States",
               "short_name" : "US",
               "types" : [ "country", "political" ]
            },
            {
               "long_name" : "11211",
               "short_name" : "11211",
               "types" : [ "postal_code" ]
            }
         ],
         "formatted_address" : "279 Bedford Ave, Brooklyn, NY 11211, USA",
         "geometry" : {
            "location" : {
               "lat" : 40.7142484,
               "lng" : -73.9614103
            },
            "location_type" : "ROOFTOP",
            "viewport" : {
               "northeast" : {
                  "lat" : 40.71559738029149,
                  "lng" : -73.9600613197085
               },
               "southwest" : {
                  "lat" : 40.71289941970849,
                  "lng" : -73.96275928029151
               }
            }
         },
         "place_id" : "ChIJT2x8Q2BZwokRpBu2jUzX3dE",
         "plus_code" : {
            "compound_code" : "P27Q+MC Brooklyn, New York, United States",
            "global_code" : "87G8P27Q+MC"
         },
         "types" : [
            "bakery",
            "cafe",
            "establishment",
            "food",
            "point_of_interest",
            "store"
         ]
      },

   ... Additional results truncated in this example[] ...

   ],
   "status" : "OK"
}*/

export async function getCoordinatesFromAddress(address) {
    const urlAddress = encodeURI(address); // Make sure it is a properly formed URL (White spaces, special characters,...)
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`);
    if (!response.ok) {
        throw new Error("Failed to fetch coordinates. Please try again.");        
    }
    const data = await response.json();
    
    if (condition) {
        throw new Error(data.error_message);
    }

    return data.results[0].geometry.location;
}

/* https://developers.google.com/maps/documentation/geocoding/start

Below is a sample geocoding response, in JSON:


{
   "results" : [
      {
         "address_components" : [
            {
               "long_name" : "1600",
               "short_name" : "1600",
               "types" : [ "street_number" ]
            },
            {
               "long_name" : "Amphitheatre Parkway",
               "short_name" : "Amphitheatre Pkwy",
               "types" : [ "route" ]
            },
            {
               "long_name" : "Mountain View",
               "short_name" : "Mountain View",
               "types" : [ "locality", "political" ]
            },
            {
               "long_name" : "Santa Clara County",
               "short_name" : "Santa Clara County",
               "types" : [ "administrative_area_level_2", "political" ]
            },
            {
               "long_name" : "California",
               "short_name" : "CA",
               "types" : [ "administrative_area_level_1", "political" ]
            },
            {
               "long_name" : "United States",
               "short_name" : "US",
               "types" : [ "country", "political" ]
            },
            {
               "long_name" : "94043",
               "short_name" : "94043",
               "types" : [ "postal_code" ]
            }
         ],
         "formatted_address" : "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
         "geometry" : {
            "location" : {
               "lat" : 37.4267861,
               "lng" : -122.0806032
            },
            "location_type" : "ROOFTOP",
            "viewport" : {
               "northeast" : {
                  "lat" : 37.4281350802915,
                  "lng" : -122.0792542197085
               },
               "southwest" : {
                  "lat" : 37.4254371197085,
                  "lng" : -122.0819521802915
               }
            }
         },
         "place_id" : "ChIJtYuu0V25j4ARwu5e4wwRYgE",
         "plus_code" : {
            "compound_code" : "CWC8+R3 Mountain View, California, United States",
            "global_code" : "849VCWC8+R3"
         },
         "types" : [ "street_address" ]
      }
   ],
   "status" : "OK"
}*/