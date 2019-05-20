export const pagination = (data) => {
    return {
        data() {
            return {
                page: 1,
                pre_page: 20,
                total_count: 0,
                export_total: 100000,
                ...data
            }
        }
    }
}
