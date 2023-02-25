import create from "zustand";

export interface Post {
  id: number;
  title: string;
  body: string;
}

interface CounterState {
  count: number;
  title: string;
  posts: Post[];

  FechaInicio:(value: string) => void;
  increment: (value: number) => void;
  getPosts: () => Promise<void>;
  cleanStore: () => void;
  multiply: (value: number) => void;
  titulo:(value: string) => void;
  
}

interface FiltroSisplani{
  StrFechaInicio: string;
  StrFechaFin: string;
  Strtipocliente: string;
  Strunidad: string;
  Strsubdivision: string;
  Strcategoria: string;
  Strzona: string;
  Strcosto: string;
  Strpuntoventa: string;
  Strservicio: string;
  Strtipoventa: string;

  StrTicket: String;

  OutSetFechaInicio:(value: string) => void;
  OutSetFechaFin:(value: string) => void;
  OutSettipocliente:(value: string) => void;
  OutSetunidad:(value: string) => void;
  OutSetsubdivision:(value: string) => void;
  OutSetcategoria:(value: string) => void;
  OutSetzona:(value: string) => void;
  OutSetcosto:(value: string) => void;
  OutSetpuntoventa:(value: string) => void;
  OutSetservicio:(value: string) => void;
  OutSettipoventa:(value: string) => void;

  OutSetTicket:(value: string)=>void;
}

export const useCounterStore = create<CounterState>((set, get) => ({
  title: "Some title",
  count: 10,
  posts: [],
  titulo:(value: string) =>set((state) => ({ ...state,title:value })),
  increment: (value: number) =>set((state) => ({ ...state, count: state.count + value })),
  getPosts: async () => {
    const posts = await (
      await fetch("https://jsonplaceholder.typicode.com/posts")
    ).json();
    set((state) => ({ ...state, posts }));
  },
  cleanStore: () => set({}, true),
  multiply: (value: number) => {
    // const count = get().count
    const { count } = get();
    set({ count: count * value });
  },
  FechaInicio:(value: string) =>set((state) => ({ ...state,title:value })),
}));

export const TemporalStoreFiltros = create<FiltroSisplani>((set,get) => ({
  StrFechaInicio: "2023-01-01",
  StrFechaFin: "2023-01-31",
  Strtipocliente: "TODOS",
  Strunidad: "TODOS",
  Strsubdivision: "TODOS",
  Strcategoria: "TODOS",
  Strzona: "TODOS",
  Strcosto: "TODOS",
  Strpuntoventa: "TODOS",
  Strservicio: "TODOS",
  Strtipoventa: "TODOS",

  StrTicket: "",

  OutSetFechaInicio:(value: string) => set((state) => ({ ...state,StrFechaInicio:value })),
  OutSetFechaFin:(value: string) => set((state) => ({ ...state,StrFechaFin:value })),
  OutSettipocliente:(value: string) => set((state) => ({ ...state,Strtipocliente:value })),
  OutSetunidad:(value: string) => set((state) => ({ ...state,Strunidad:value })),
  OutSetsubdivision:(value: string) => set((state) => ({ ...state,Strsubdivision:value })),
  OutSetcategoria:(value: string) => set((state) => ({ ...state,Strcategoria:value })),
  OutSetzona:(value: string) => set((state) => ({ ...state,Strzona:value })),
  OutSetcosto:(value: string) => set((state) => ({ ...state,Strcosto:value })),
  OutSetpuntoventa:(value: string) => set((state) => ({ ...state,Strpuntoventa:value })),
  OutSetservicio:(value: string) => set((state) => ({ ...state,Strservicio:value })),
  OutSettipoventa:(value: string) => set((state) => ({ ...state,Strtipoventa:value })),

  OutSetTicket:(value: string) => set((state) => ({ ...state,StrTicket:value })),

}));





