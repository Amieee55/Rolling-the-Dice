"use strict"; //Strict Mode
//Note to self '' and `` are differnet 

async function getAllRecords(){ //function for Event List
    let container = document.getElementById("eventList");

    //clear ol content
    container.innerHTML ="<h4>Event List <h4>";
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${secrets.API_KEY}`,
        },
    };
    const response = await fetch(
        `https://api.airtable.com/v0/appx3kAqDzfrdw6NC/Respawn%20Point?returnFieldsByFieldId=true`,
        options
    );
    const data = await response.json();

    console.log(data); //see Airtable data

    data.records.forEach(record => {
        let fields = record.fields;

        //html code for Event Card
        let card = `
<div class="cardEvent card d-flex">
    <div class="top-Card">  <!--Top Section-->
        <div class="eventName d-flex flex-row">
            <p>${fields["fldQyz4DI6To3rQlZ"]}</p>
        </div>
        <div class="imageType">
        <img src="${fields["fld2mASM3OlRq1LFD"]?.[0]?.url}" alt="#">
        </div>
    </div>
    <div class="middlePhoto"> <!--Middle-->
        <img class="text-center" src="${fields["fldEwehoiY9W0QY9E"]?.[0]?.url}" alt="#" width="300px">
    </div>
    <div class="eventDate">
        <p>${fields["fldXlmyk1BD64LcO3"]}</p>
    </div>
    <div class="bottom-Card"> <!--Bottom Section-->
        <p class="location">${fields["fld1pwJCzozb4VoER"]}</p>
        <p class="eventDetails">${fields["fldF3ia1FtzBEHzpJ"]}</p>
        <p class="contact">${fields["fldQoskto8g5AxIdN"]}</p>
        <div class="pillSection">
            <div class="feeCard text-center">
                <p class="text-center"><u>FEE</u><br> ${fields["fldSsH3vAB2X1ZQ7e"]}</p>
            </div>
            <div class="prizeCard text-center">
                <p><u>Prize</u><br>${fields["fldcjXvUlXncBQLer"]}</p>
            </div>
        </div>
    </div>
  </div>
</div>
        `;
        container.innerHTML += card;
    });
}
getAllRecords();
