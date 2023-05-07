
function AppendProjectCards(project_cards){
    var project_card_container = document.getElementById('project-card-container');
for(let i=0;i<project_cards.length;i++){
        project_card_container.appendChild(project_cards[i])
    }
}

function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

function GenerateGroupNamesString(
    Member1Name,
    Member2Name,
    Member3Name,
    Member4Name,
    Member5Name
){
    var output_string = ''
    var input_list = [Member1Name,
        Member2Name,
        Member3Name,
        Member4Name,
        Member5Name];
    console.log(input_list)

    var input_list_clean = removeItemAll(input_list, value='');
    console.log(input_list_clean)
    for(let i=0;i<(input_list_clean.length-1);i++){
        output_string = output_string + input_list_clean[i]
        output_string = output_string + ', '
    }
    console.log(input_list_clean.length)
    output_string = output_string + '& ' + input_list_clean[input_list_clean.length-1]
    return output_string
}

function GenerateProjectCard(data){
    var card_body = document.createElement('div');
    card_body.className = 'card card-fade-in';

    var card_img = document.createElement('iframe');
    card_img.className = 'card-img';
    if(data.Visibility=='Just Report'){
        card_img.src = data.ReportPath;
        card_img.type = 'application/pdf';
    }else{

        card_img.src = data.EmbedYTLink;
    }
    
    card_body.appendChild(card_img);

    var card_title_container = document.createElement('div');
    card_title_container.className = 'card-title-container';

    var card_title = document.createElement('p');
    card_title.className = 'card-title';
    card_title.innerHTML = data.ProjectTitle;

    card_title_container.appendChild(card_title);
    card_body.appendChild(card_title_container);

    var group_names_str = GenerateGroupNamesString(
        data.Member1Name,
        data.Member2Name,
        data.Member3Name,
        data.Member4Name,
        data.Member5Name
    )

    var card_author_container = document.createElement('div');
    card_author_container.className = 'card-text-container'

    var card_author_text = document.createElement('p')
    card_author_text.className = 'card-author'
    card_author_text.innerHTML = '<strong>'+'Team ' + data.GroupNum + '</strong>'+'<br>'+group_names_str
    
    card_author_container.appendChild(card_author_text)
    card_body.appendChild(card_author_container)



    // var card_description_container = document.createElement('div');
    // card_description_container.className = 'card-text-container';
    
    // var card_description = document.createElement('p');
    // card_description.className = 'card-text';
    // card_description.innerHTML = data.ProjectDescription;

    // card_description_container.appendChild(card_description);
    // card_body.appendChild(card_description_container);

    if(data.Visibility == 'Just Video'){

    var card_button_container = document.createElement('div');
    card_button_container.className = 'card-button-container';

    var card_button = document.createElement('button');
    card_button.className = 'card-button'
    card_button.innerHTML = 'Watch Video'
    

    var card_button_link = document.createElement('a');
    card_button_link.href = data.EmbedYTLink
    card_button_link.target = "_blank"
    card_button_link.rel = "noopener noreferrer"

    card_button_link.appendChild(card_button)
    card_button_container.appendChild(card_button_link)
    card_body.appendChild(card_button_container)
    }else{
    var card_button_container = document.createElement('div');
    card_button_container.className = 'card-button-container';

    var card_button = document.createElement('button');
    card_button.className = 'card-button'
    card_button.innerHTML = 'Read Final Report'
    

    var card_button_link = document.createElement('a');
    card_button_link.href = data.ReportPath
    card_button_link.target = "_blank"
    card_button_link.rel = "noopener noreferrer"

    card_button_link.appendChild(card_button)
    card_button_container.appendChild(card_button_link)
    card_body.appendChild(card_button_container)
    }

    

    return card_body
}

function GenerateAllProjectCards(data){
    var output = [];
    for(let i=0;i<data.length;i++){
        let output_i = GenerateProjectCard(data[i]);
        output.push(output_i);
    }
    return output
}

ProjectData = d3.csv('./Data/ProjectData/Project_Expo_Data.csv',function(data){
	return {
    GroupNum: data.GroupNum ,
    Visibility: data.Visibility,
    Member1Name: data.Member1Name,
    Member2Name: data.Member2Name,
    Member3Name: data.Member3Name,
    Member4Name: data.Member4Name,
    Member5Name: data.Member5Name,
    ProjectTitle: data.ProjectTitle,
    ProjectDescription: data.ProjectDescription,
    RawYTLink: data.RawYoutubeLink,
    EmbedYTLink: data.EmbedYoutubeLink,
    ReportPath: data.ReportPath
	}
}).then(function(ProjectData){
    var project_cards = GenerateAllProjectCards(ProjectData);
    AppendProjectCards(project_cards);
}

)