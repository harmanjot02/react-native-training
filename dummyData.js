import { useEffect, useState } from "react"
import { View, Text, ScrollView } from "react-native"

const DummyData = () => {

    const [serverData, setServerData] = useState([])

    getData = async () => {
        try{
            const data = await fetch('https://dummyjson.com/products')
            const jsonData = await data.json()
            setServerData(jsonData.products)
            // console.warn(serverData)
        }catch(err){
            console.warn(err)
        }
    }

    useEffect(() => {
        getData()
    })

    return (
        <ScrollView style={{marginTop: 20}}>
            <Text style={{textAlign: 'center', fontSize: 20}}>PRODUCTS</Text>
            { serverData.length ? serverData.map(item =>
                <View key={item.id} style={{margin: 10}}>
                    <Text>Title : {item.title}</Text>
                    <Text>Brand : {item.brand}</Text>
                    <Text>Description : {item.description}</Text>
                    <Text>Price : {item.price}</Text>
                </View>
            ) : <Text>Loading Data...</Text>}
        </ScrollView>
    )
}

export default DummyData