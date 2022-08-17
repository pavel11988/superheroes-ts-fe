import ISuperhero from './superhero.interface';

export default interface ISuperheroesState {
    superheroes: ISuperhero[];
    currentSuperhero: ISuperhero;
    totalPages: number;
    page: number;
    limit: number;
    status: string | null ;
    error: boolean | null;
}