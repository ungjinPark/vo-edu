function generateTableOfContents() {
    const toc = document.querySelector('#indexes');
    let result = "";
    

    const headers = [...document.querySelectorAll("article :is(h2,h3,h4,h5,h6)")];
    headers.forEach((_,i)=>{
        _.id = _.id ? _.id : `${_.tagName.toLowerCase()}_${i+1}`;
    });


    const opened = new Array(5).fill(false);
    const getLevel = (heading)=>Number(heading.tagName.toLowerCase()[1]);
    for( let i=0; i<headers.length; i++){
        const heading = headers[i];
        const level = getLevel(heading);
        const nextHeading = headers[i+1];
        const previousHeading = headers[i-1];
        
        if(nextHeading) {
            const nextLevel = getLevel(nextHeading);
            result += `\n<li><a href="#${heading.id}">${heading.textContent}</a>`
            if(nextLevel > level) {
                result += "<ul>";
                opened[nextLevel] = true;
            }
            else if(nextLevel < level ) {
                if(nextLevel-level < 0) {
                    result += new Array(Math.abs(nextLevel-level)).fill("</li></ul>").join("\n");
                } else {
                    result += "</li></ul>";
                }

                opened[nextLevel] = false;
            }
            else if(nextLevel == level) {
                result += "</li>";
            }
        } else {
            if(!nextHeading) {
                result+=`\n<li><a href="#${heading.id}">${heading.textContent}</a>`
            }
            if(opened.filter(_=>_).length) {
                result += new Array(opened.filter(_=>_).length).fill("</ul>").join("");
            }
        }
        
    }
    toc.insertAdjacentHTML("beforeend",result);
}

// 페이지 로드 시 목차 생성
generateTableOfContents();