import ISuperheroDB from './superherodb.interface';

export default interface ISuperheroesState {
    superheroes: ISuperheroDB[];
    currentSuperhero: ISuperheroDB;
    totalPages: number;
    page: number;
    limit: number;
    status: string | null ;
    error: boolean | null;
}