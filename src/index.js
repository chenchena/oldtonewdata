/* 将原来的数据和修改过后的数据对比，取改动过的数据 
   data 数据对象
   oldData 原来的数据对象
   idName id名称
   versionName 版本名称
   return {}
*/
function compareData(data, oldData, idName, versionName){
    if(data instanceof Array){
        let result = []
        let old = {}
        oldData.forEach(v => {
            old[v[idName]] = v
        })
        let i = 0
        data.forEach(v => {
            let obj = objectToUpdate(v, old[v[idName]], idName, versionName)
            if (obj != null) {
                result[i] = obj
                i++
            }
        })
        if (result.length === 0){
            return null
        }
    } else {
        return objectToUpdate(data, oldData, idName, versionName)
    }
}

function objectToUpdate(data, oldData, idName, versionName){
    if(oldData == null) {
        return data
    }
    let i = 0
    let updateData = {}
    for (let key in data) {
        if(data[key] !== oldData[key]) {
            i++
            updateData[key] = data[key] ? data[key] : ''
        }
    }
    if (i === 0) {
        return null
    }
    if(idName == null){
        idName = 'id'
        versionName = 'version'
    }
    updateData[idName] = data[idName]
    updateData[versionName] = data[versionName]
    return updateData
}

export {
    compareData
}