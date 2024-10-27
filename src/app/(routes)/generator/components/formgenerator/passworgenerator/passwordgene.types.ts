

export type PassWordGeneratorProps = {
    setLengthPassword: React.Dispatch<React.SetStateAction<number>>;
    lengthPassword: number;
    isMayusSelected: boolean;
    setIsMayusSelected: React.Dispatch<React.SetStateAction<boolean>>;
    isMinusSelected: boolean;
    setIsMinusSelected: React.Dispatch<React.SetStateAction<boolean>>;
    isSpecialCharacters: boolean;
    setIsSpecialCharacters: React.Dispatch<React.SetStateAction<boolean>>;
    isNumberSelected: boolean;
    setIsNumberSelected: React.Dispatch<React.SetStateAction<boolean>>;
};