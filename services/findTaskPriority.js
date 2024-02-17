
function findTaskPriority(due_date) {
    const totalDate = new Date();
    const due = new Date(due_date);
    const curr_date = totalDate.getDate();
    const curr_month = totalDate.getMonth();
    const curr_year = totalDate.getFullYear();
    const last_date = due.getDate();
    const last_month = due.getMonth();
    const last_year = due.getFullYear();
    let priority = 3;
    if(curr_year === last_year){
        if(curr_month === last_month){
            if(curr_date === last_date){
                priority = 0;
            }else{
                priority = Math.abs(curr_date - last_date) === 1 || Math.abs(curr_date - last_date) === 2 ? 1 :
                                Math.abs(curr_date - last_date) === 3 || Math.abs(curr_date - last_date) === 4 ? 2 :
                                Math.abs(curr_date - last_date) >= 5 ? 3 : 3
            }
        }
    }
    return priority
}

module.exports = {
    findTaskPriority
}