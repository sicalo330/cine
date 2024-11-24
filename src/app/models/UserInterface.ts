export interface UserInterface {
    id: string;
    name: string;
    email: string;
    history: string[];
    preferences: string[];
    createdAt: {
      seconds: number;
      nanoseconds: number;
    };
  }
  