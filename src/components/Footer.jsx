import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram } from 'react-icons/fi';
// Importing React Leaflet components and its required CSS
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Footer() {
  // Coordinates for Saint Petersburg, Russia (Snezhnaya Inspiration)
  const snezhnayaPosition = [59.9311, 30.3609];

  return (
    <footer className="bg-dry-sage-100 text-dark-spruce-800 pt-12 pb-6 border-t border-dry-sage-200 mt-auto">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          
          {/* Store Location */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-dark-spruce-950">Store Location</h3>
            
            {/* React Leaflet Map */}
            <div className="w-full h-40 mb-3 relative z-0 rounded overflow-hidden shadow-inner border border-dry-sage-300">
              <MapContainer 
                center={snezhnayaPosition} 
                zoom={12} 
                scrollWheelZoom={false} 
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={snezhnayaPosition}>
                  <Popup>
                    <strong>Anasta See Yatures</strong> <br /> Snezhnaya District Branch.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            
            <p className="text-sm leading-relaxed">
              123 Vintage Avenue, Retro District<br/>
              Snezhnaya City, Russia 4500
            </p>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-dark-spruce-950">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-fern-600 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="#" className="hover:text-fern-600 transition-colors">Shipping</Link></li>
              <li><Link to="#" className="hover:text-fern-600 transition-colors">Repair Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-dark-spruce-950">Newsletter</h3>
            <p className="text-sm mb-4">Sign up to receive updates about new stocks and promo.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full p-2 text-sm rounded border border-dry-sage-300 focus:outline-none focus:ring-2 focus:ring-fern-500 bg-soft-linen-50"
              />
              {/* Added whitespace-nowrap to prevent text from stacking */}
              <button className="whitespace-nowrap bg-dark-spruce-800 text-soft-linen-50 px-4 py-2 text-sm font-semibold rounded hover:bg-dark-spruce-700 transition-colors shadow-sm">
                Sign Up
              </button>
            </div>
          </div>

        </div>

        <hr className="border-dry-sage-300 mb-8" />

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          
          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-dark-spruce-950">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-fern-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-fern-600 transition-colors">Terms & Condition</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-dark-spruce-950">Social</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-fern-600 transition-colors" aria-label="Facebook">
                <FiFacebook size={24} />
              </a>
              <a href="#" className="hover:text-fern-600 transition-colors" aria-label="Instagram">
                <FiInstagram size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-dark-spruce-950">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: hello@anastaseeyatures.com</li>
              <li>Telephone: +63 912 345 6789</li>
              <li>Operation Hours: 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
          
        </div>

        <div className="text-center text-sm pt-4 border-t border-dry-sage-300 text-dark-spruce-700 font-medium">
          <p>&copy; 2026 Anasta See Yatures. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}