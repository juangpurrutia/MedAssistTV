import Moment from 'moment';

export function formatDate(date: undefined | Date | string | null) : string {
    let dateFormmated = '';
    try{
        if(date){
            dateFormmated = Moment(date, 'YYYY-MM-DDTHH:mm:ss').format("DD/MM/yyyy HH:mm")
        }
    }catch(err){
        console.log("error when try parse date", err);
    }   
    return dateFormmated;
}