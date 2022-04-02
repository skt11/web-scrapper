import axios from 'axios';
import { load } from 'cheerio';

export const countWordsInUrl = async (words: string[], url: string, caseInsensitive:boolean = false) => {
    const pageContent = (await fetchHtmlDoc(url)).text();
    const countPromiseList = words.map(word => countWordInString(word, pageContent, caseInsensitive));
    return Promise.all(countPromiseList);
}

const countWordInString = (word: string, str: string, i: boolean = false) => {
    return new Promise((res, rej) => {
        try{
            const regex = new RegExp(word, 'g'+ (i ? 'i' : ''));
            let count = (str.match(regex) || []).length;
            res({[word]:count})
        } catch(e){
            rej(e)
        }
    })
}

const fetchHtmlDoc = async (url: string) =>{
    const { data } = await axios.get(url);
    return load(data);
}