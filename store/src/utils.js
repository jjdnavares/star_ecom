export function formatCurrency(amount, currency) {
    return new Intl.NumberFormat("en-Ph", { style: "currency", currency: currency }).format(amount)
}