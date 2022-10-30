const baseUrl = "https://api.quran.gading.dev/";
const provinsi = `${baseUrl}surah/`;
const kota=`${baseUrl}city`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");

function getListTeams() {
    title.innerHTML = "daftar surat";
    fetch(provinsi)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let prov = "";
            resJson.data.forEach(provs => {
                prov += `
                <li class="collection-item avatar">
                ${provs.number} <br>
                    ${provs.name.long}
                    ${provs.name.transliteration.id}<br>
                    ${provs.name.translation.id}<br>
                    ${provs.revelation.id}<br>
                    <p>
                    ${provs.tafsir.id}<br>
                    </p>
                    <a href="#" data-id=${provs.number} class="secondary-content"><i  data-id=${provs.number} class="material-icons">info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + prov + '</ul>';
            const detail = document.querySelectorAll('.secondary-content');
            detail.forEach(btn=>{
                btn.onclick=(event)=>{
                    showTeamInfo(event.target.dataset.id);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}
function showTeamInfo(id){
    title.innerHTML = "Detail surat"
    console.log(id);
    fetch(provinsi+id)
        .then(response => response.json())
        .then(resJson => {
            
            let i = 1;
            let table = "";
            let isis="";
                table += `
                <li class="collection-item avatar">
                ${resJson.data.name.long}
                ${resJson.data.name.transliteration.id}<br>
                ${resJson.data.name.translation.id}<br>
                ${resJson.data.revelation.id}<br>
                <p>
                ${resJson.data.tafsir.id}<br>
                </p>
                ${resJson.data.verses.forEach(isi=>{
                    isis +=`<p>
                    ${isi.text.arab}<br>
                    ${isi.text.transliteration.en}
                    </p>
                    <audio controls>
                    <source src="${isi.audio.primary}" type="audio/mpeg">
                    Browsermu tidak mendukung tag audio, upgrade donk!
                  </audio>
                  ${isi.tafsir.id.long}
                  `
                })}
            </li>
                `;
            
            contents.innerHTML = '<ul class="collection">' + table+isis + '</ul>';
        }).catch(err => {
            console.error(err);
        })
    
}
// function getListStandings() {
//     title.innerHTML = "Klasemen Sementara Liga Primer Inggris";
//     fetch(standingEndPoin)
//         .then(response => response.json())
//         .then(resJson => {
//             console.log(resJson.data[0]);
//             let teams = "";
//             let i = 1;
//             resJson.data.forEach(team => {
//                 teams += `
//                 <tr>
//                     <td style="padding-left:20px;">${i}.</td>
//                     <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px"></td>
//                     <td>${team.team.name}</td>
//                     <td>${team.playedGames}</td>
//                     <td>${team.won}</td>
//                     <td>${team.draw}</td>
//                     <td>${team.lost}</td>
//                     <td>${team.points}</td>
//                 </tr>
//                 `;
//                 i++;

//             });
//             contents.innerHTML = `
//                 <div class="card">
//                     <table class="stripped responsive-table">
//                         <thead>
//                             <th></th>
//                             <th></th>
//                             <th>Nama Tim</th>
//                             <th>PG</th>
//                             <th>W</th>
//                             <th>D</th>
//                             <th>L</th>
//                             <th>P</th>
//                         </thead>
//                         <tbody>
//                             ${teams}
//                         </tbody>
//                     </table>
//                 </div>
//             `;
//         }).catch(err => {
//             console.error(err);
//         })
// }
// function getListMatches() {
//     title.innerHTML = "Jadwal Pertandingan Liga Primer Inggris";
//     fetch(matchEndPoin)
//         .then(response => response.json())
//         .then(resJson => {
//             console.log(resJson.matches);
//             let matchs = "";
//             let i = 1;
//             resJson.matches.forEach(match => {
//                 let d = new Date(match.utcDate).toLocaleDateString("id");
//                 let scoreHomeTeam = (match.score.fullTime.homeTeam == null ? 0 : match.score.fullTime.homeTeam);
//                 let scoreAwayTeam = (match.score.fullTime.awayTeam == null ? 0 : match.score.fullTime.awayTeam);
//                 matchs += `
//                 <tr>
//                     <td style="padding-left:20px;">${i}.</td>
//                     <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
//                     <td>${d}</td>
//                     <td>${scoreHomeTeam}:${scoreAwayTeam}</td>
//                 </tr>
//                 `;
//                 i++;

//             });
//             contents.innerHTML = `
//                 <div class="card">
//                     <table class="stripped responsive-table">
//                         <thead>
//                             <th></th>
//                             <th>Peserta</th>
//                             <th>Tanggal</th>
//                             <th>Skor Akhir</th>
//                         </thead>
//                         <tbody>
//                             ${matchs}
//                         </tbody>
//                     </table>
//                 </div>
//             `;
//         }).catch(err => {
//             console.error(err);
//         })
// }
function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        // case "standings":
        //     getListStandings();
            // break;
        // case "matches":
        //     getListMatches();
        //     break;
        // case "squads":
        //     showTeamInfo();
        //     break;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});