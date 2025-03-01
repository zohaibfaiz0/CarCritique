'use client';
import { useEffect, useState } from 'react';
import { CarSpecifications } from '@/types/specs';
import { sanityClient } from '@/sanity/lib/sanityClient';
import { CarSelector } from '@/app/components/CarSelector';
import { CarDetails } from '@/app/components/CarDetails';
import { Car } from 'lucide-react';
import NavBar from '../components/NavBar';

const ComparePage = () => {
  const [cars, setCars] = useState<CarSpecifications[]>([]);
  const [selectedCar1, setSelectedCar1] = useState<CarSpecifications | null>(null);
  const [selectedCar2, setSelectedCar2] = useState<CarSpecifications | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const data = await sanityClient.fetch(`*[_type == "carSpecifications"]{
          _id,
          name,
          engine,
          transmission,
          drivetrain,
          dimensions,
          performance,
          price,
          image {
            asset-> {
              url
            }
          }
        }`);
        setCars(data);
      } catch (err) {
        setError('Failed to fetch car data');
        console.error('Error fetching cars:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <NavBar /> {/* NavBar is placed at the top */}
      <div className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <Header />
          
          <div className="flex flex-wrap -mx-4 mb-12">
            <CarSelector
              title="First Vehicle"
              onSelect={setSelectedCar1}
              selected={selectedCar1}
              onClear={() => setSelectedCar1(null)}
              cars={cars}
              formatPrice={formatPrice}
            />
            <CarSelector
              title="Second Vehicle"
              onSelect={setSelectedCar2}
              selected={selectedCar2}
              onClear={() => setSelectedCar2(null)}
              cars={cars}
              formatPrice={formatPrice}
            />
          </div>

          {selectedCar1 && selectedCar2 ? (
            <ComparisonSection car1={selectedCar1} car2={selectedCar2} formatPrice={formatPrice} />
          ) : (
            <Placeholder />
          )}
        </div>
      </div>
    </div>
  );
};

const Header = () => (
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold text-white mb-4">Vehicle Comparison</h1>
    <div className="h-1 w-60 bg-red-600 mx-auto mb-8" />
    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
      Compare specifications and features of different vehicles
    </p>
  </div>
);

const ComparisonSection = ({ car1, car2, formatPrice }: { 
  car1: CarSpecifications; 
  car2: CarSpecifications;
  formatPrice: (price: number) => string;
}) => (
  <div className="space-y-8">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Detailed Comparison</h2>
      <div className="h-1 w-60 bg-red-600 mx-auto mb-8" />
    </div>

    <div className="grid grid-cols-2 gap-8">
      <CarDetails car={car1} formatPrice={formatPrice} />
      <CarDetails car={car2} formatPrice={formatPrice} />
    </div>
  </div>
);

const Placeholder = () => (
  <div className="bg-gray-800 rounded-lg p-12 text-center">
    <Car size={48} className="mx-auto mb-4 text-red-500" />
    <h3 className="text-xl font-semibold text-white mb-2">
      Select Two Vehicles to Compare
    </h3>
    <p className="text-gray-400">
      Choose vehicles from the selectors above to see a detailed comparison
    </p>
  </div>
);

const LoadingScreen = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-red-500 text-xl">Loading vehicles...</div>
  </div>
);

const ErrorScreen = ({ error }: { error: string }) => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-red-500 text-xl">{error}</div>
  </div>
);

export default ComparePage;