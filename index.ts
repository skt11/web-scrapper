import { countWordsInUrl } from "./src/scrapper";
import minimist from 'minimist';

const args = minimist(process.argv.slice(2))

if(!args.url || !args.words) {
    console.log("Wrong command, example command: npm run start -- --url=https://anatta.io --words=Sustainable,Growth,Anatta");
    process.exit(0)
}

countWordsInUrl(args.words.split(',') , args.url, !!args.i).then(r => console.log(r)).catch(e =>  console.log(e))