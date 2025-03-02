'use client';
import { CarSpecifications } from '@/types/specs';

interface CarDetailsProps {
  car: CarSpecifications;
  formatPrice: (price: number) => string;
}

export const CarDetails = ({ car, formatPrice }: CarDetailsProps) => (
  <div className="max-w-lg mx-auto p-4">
    <h3 className="text-lg sm:text-2xl font-bold text-white mb-6 text-center">{car.name}</h3>
    <div className="space-y-4">
      <DetailItem label="Engine Type" value={car.engine.type} />
      <DetailItem label="Engine Displacement" value={`${car.engine.displacement}L`} />
      <DetailItem label="Horsepower" value={`${car.engine.horsepower} HP`} />
      <DetailItem label="Torque" value={`${car.engine.torque} Nm`} />
      <DetailItem label="Fuel Type" value={car.engine.fuelType} />
      <DetailItem label="Transmission" value={car.transmission} />
      <DetailItem label="Drivetrain" value={car.drivetrain} />
      <DetailItem label="Length" value={`${car.dimensions.length}m`} />
      <DetailItem label="Width" value={`${car.dimensions.width}m`} />
      <DetailItem label="Height" value={`${car.dimensions.height}m`} />
      <DetailItem label="Wheelbase" value={`${car.dimensions.wheelbase}m`} />
      <DetailItem label="0-60 mph" value={`${car.performance.ZeroToSixty}s`} />
      <DetailItem label="Top Speed" value={`${car.performance.topSpeed} mph`} />
      <DetailItem label="Weight" value={`${car.performance.weight} kg`} />
      <DetailItem label="Price" value={formatPrice(car.price)} />
    </div>
  </div>
);

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-between">
    <p className="text-gray-400">{label}</p>
    <p className="text-white">{value}</p>
  </div>
);
