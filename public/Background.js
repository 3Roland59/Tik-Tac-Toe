// function random_bg_color(){
    let hex = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
    // let a 

    function populate (a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14)
            let y = hex[x]
            a+=y
        }
        return a
    }
    function ang(){
        let angs = ['0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg']
        let z = Math.round(Math.random() * 7)
        let w = angs[z]
        return w
    } 

    let color1 = populate('#')
    let color2  = populate('#')
    let angle = ang()

    let gradient = 'linear-gradient('+ angle + ',' + color1 + ',' + color2 + ')'
    document.querySelector('body').style.background = gradient
// }

// random_bg_color()