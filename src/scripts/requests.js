async function allSectors(){
    const sectors=await fetch('http://localhost:6278/companies',{
        method:'GET'
    })
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));

    return sectors
}


export let AllSectors=  await allSectors()



