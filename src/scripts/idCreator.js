export default function generateId(){
    const part1 = Date.now().toString(35)
    const part2 = Math.random().toString(36).slice(2)
    return part1 + part2
}