import axios from "axios";

const API = 'https://penduapi.exs3.com/';


export async function  getDictionnaire(){
    const response = await axios.get(API);
    console.log(response.data.mot);
    return formatMot(response.data.mot);

}

function formatMot(motRecu){
    console.log(motRecu);
    let phraseEnMajuscule = motRecu.toUpperCase();
    let phraseSansAccent;
    phraseSansAccent = removeAccents(phraseEnMajuscule);
    return phraseSansAccent;
}

function removeAccents(str){
    let accents    = ['À','Á','Â','Ã','Ä','Å','à','á','â','ã','ä','å','Ò','Ó','Ô','Õ','Õ','Ö','Ø','ò','ó','ô','õ','ö','ø','È','É','Ê','Ë','è','é','ê','ë','ð','Ç','ç','Ð','Ì','Í','Î','Ï','ì','í','î','ï','Ù','Ú','Û','Ü','ù','ú','û','ü','Ñ','ñ','Š','š','Ÿ','ÿ','ý','Ž','ž'];
    let accentsOut = ["A","A","A","A","A","A","a","a","a","a","a","a","O","O","O","O","O","O","O","o","o","o","o","o","o","E","E","E","E","e","e","e","e","e","C","c","D","I","I","I","I","i","i","i","i","U","U","U","U","u","u","u","u","N","n","S","s","Y","y","y","Z","z"];
    str = str.split('');
    let strLen = str.length;
    let i, x;
    for (i = 0; i < strLen; i++) {
        x = accents.indexOf(str[i]);
        if (x !== -1) {
            str[i] = accentsOut[x];
        }
    }
    return str.join('');
}


export function computeDisplay(phrase, usedLetters) {
    let newPhraseCachee;
    newPhraseCachee = phrase.replace(/\w/g,
        (letter) => (usedLetters.includes(letter) ? letter : ' __ ')
    );
    return newPhraseCachee;
}
