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
          image { asset-> { url } }
        }`);
        setCars(data);
      } catch (err) {
        setError('Failed to fetch car data');
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

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;

  return (
    <div className="bg-gray-900 min-h-screen overflow-y-auto">
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900">
        <NavBar />
      </div>

      <div className="container mx-auto p-4 pt-20">
        <Header />
        
        {/* Car Selectors */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
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

        {/* Comparison Results */}
        {selectedCar1 && selectedCar2 ? (
          <ComparisonSection car1={selectedCar1} car2={selectedCar2} formatPrice={formatPrice} />
        ) : (
          <Placeholder />
        )}

        <div className="h-6"></div>
      </div>
    </div>
  );
};

const Header = () => (
  <div className="text-center mb-6">
    <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">Vehicle Comparison</h1>
    <div className="h-1 w-32 md:w-48 bg-red-600 mx-auto mb-4" />
    <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
      Compare specifications and features of different vehicles.
    </p>
  </div>
);

const ComparisonSection = ({ car1, car2, formatPrice }: { 
  car1: CarSpecifications; 
  car2: CarSpecifications;
  formatPrice: (price: number) => string;
}) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Detailed Comparison</h2>
      <div className="h-1 w-32 md:w-48 bg-red-600 mx-auto mb-4" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CarDetails car={car1} formatPrice={formatPrice} />
      <CarDetails car={car2} formatPrice={formatPrice} />
    </div>
  </div>
);

const Placeholder = () => (
  <div className="bg-gray-800 rounded-lg p-6 text-center">
    <Car size={40} className="mx-auto mb-3 text-red-500" />
    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
      Select Two Vehicles to Compare
    </h3>
    <p className="text-sm md:text-base text-gray-400">
      Choose vehicles from the selectors above to see a detailed comparison.
    </p>
  </div>
);

const LoadingScreen = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-red-500 text-lg">Loading vehicles...</div>
  </div>
);

const ErrorScreen = ({ error }: { error: string }) => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-red-500 text-lg">{error}</div>
  </div>
);

export default ComparePage;