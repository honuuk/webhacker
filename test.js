const schools = [
    "Yorktown",
    "Washington&Lee",
    "WakeField"
]
var editname = (oldname, newname, list) => list.map(idx => {
    if (idx === oldname) {
        return newname
    } else return idx
})
let updatedSchool = editname("WakeField", "jewook", schools)

console.log(updatedSchool)