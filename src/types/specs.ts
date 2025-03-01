export interface Engine {
  type: string;
  displacement: number;
  horsepower: number;
  torque: number;
  fuelType: string;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  wheelbase: number;
}

export interface Performance {
  ZeroToSixty: number;
  topSpeed: number;
  weight: number;
}

export interface CarSpecifications {
  _id: string;
  name: string;
  engine: Engine;
  transmission: string;
  drivetrain: string;
  dimensions: Dimensions;
  performance: Performance;
  price: number;
  image: {
    asset : {
      url: string;
    };
  };
}