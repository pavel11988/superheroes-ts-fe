interface Image {
    extension: string;
    id: string;
}

export default interface ISuperheroDB {
    catch_phrase: string;
    createdAt: string;
    images: Image[];
    nickname: string;
    origin_description: string;
    real_name: string;
    superpowers: string;
    updatedAt: string;
    _id: string;
}