const date = new Date();

const formatNumber = (number) => {
    if (number < 10) {
        number = `0${number}`
    }
    return number;
}

const formateDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}-${formatNumber(month)}-${formatNumber(day)}`
}

const INIT_DATA = {
    create: formateDate(date),
    number: '',
    invoice: '',
    supply: '',
    comment: ''
};


var vm = new Vue({
    el: '#app',
    data: {
        formData: {...INIT_DATA},
        // showModal: false,
        dataToShow: [],
    },
    methods: {
        cancel(){
            this.closeModal();
        },
        save() {
            if (JSON.stringify(this.formData) !== JSON.stringify(INIT_DATA)) { // если хоть что-то введено
                this.dataToShow.push(this.formData);
            }
            this.closeModal();
        },
        closeModal() {
            this.formData = {...INIT_DATA};
            this.$refs.myModalRef.hide();
        }
    }
});