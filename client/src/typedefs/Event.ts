export interface Event {
  title: string;
  description: string;
  price: number;
  date: Date;
};

export const InitialEvent:Event= {
  title: "",
  description: "",
  price: 0,
  date: new Date(),
}