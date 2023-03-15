
function onSubmit(e){
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt == '') {
        alert('Please add or input some text');
        return;

    }
    
    generateImageRequest(prompt,size);


}

async function generateImageRequest(prompt,size){
 try{
    showul();
    const response = await fetch('/openai/generateimage',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt,
            size
        })
    });
    if(!response.ok){
       removeul();
       throw new Error('That image could not be generated');
    }
    
    const data = await response.json();
    //console.log(data);

    const imageUrl = data.data
    document.querySelector('#image').src = imageUrl;
    removeul();

}catch(error){
     document.querySelector('.msg').textContent = error;  
} 
}

function showul(){
    document.querySelector('.ul').classList.add('show');

}

function removeul(){
    document.querySelector('.ul').classList.remove('show');
    
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);