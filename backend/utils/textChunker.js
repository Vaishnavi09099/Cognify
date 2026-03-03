export const chunkText =(text,chunkSize=300,overlap=50)=>{
    if(!text || text.trim().length==0) return [];
    const cleanedText = text.replace(/\n/g,"").trim();
    const words = cleanedText.split(/\s+/)
    const chunks = []
    for(let i=0;i<words.length;i+=(chunkSize-overlap)){
        const chunkWords = words.slice(i,i+chunkSize);
        chunks.push({
            content:chunkWords.join(" "),
            chunkIndex:chunks.length


        })

    }
    return chunks;


}
export default chunkText;