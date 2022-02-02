import React, { useState, useEffect } from "react";

export default function CountryCapitalGame({ data }) {
    const [list, setList] = useState([])
    const [itemsActive, setItemsActive] = useState(0) 
    const [matchError, setMatchError] = useState(false)

    useEffect(() => {
        configList()
    }, [])

    useEffect(() => {
        setItemsActive(selectedItemsQuantity())
    }, [list])

    useEffect(() => {
        if (itemsActive === 2) {
            checkMatch()
        }
    }, [itemsActive])

    // useEffect(() => {
    //     if (matchError) {
    //         checkMatch()
    //     }
    // }, [matchError])

    function selectedItemsQuantity() {
        const result = list.filter(item => item.select )
        return result.length
    }

   function styleConfig(item) {
       return { backgroundColor: item.error ? '#ff0000' : item.select ? '#0000ff' : '' }
   } 

    function configList() {
       let newList = []

        for (const [key, value] of Object.entries(data)){
            newList.push({ value: key, type: 'country', select: false })
            newList.push({ value, type: 'capital', select: false })
        }

        setList(shuffleArray(newList))
    } 

    function shuffleArray(array) {
        return  array.sort(() => Math.random() - 0.5)
    }

    function handleClick(item) {
        if (itemHasAlreadyBeenSelected(item)) { 
            if (itemsActive === 2) {
                resetItems()
            }  

            updateItem(item)

            return
        } 

        
        if (matchError) { 
            resetItems()
            updateItem(item)

            return
        }

        updateItem(item)
    }

    function itemHasAlreadyBeenSelected(item) {
        return item.select
    }

    function updateItem(item, type = 'active') {
        const result = list.map(listItem => {
            if (type === 'active' && listItem === item) {
                listItem.select = true
                listItem.styles = styleConfig(listItem)
            }

            if (type === 'error' && listItem.select) {
                listItem.error = true
                listItem.styles = styleConfig(listItem)
            }

            return listItem 
        })
        setList(result)       
    }

    function resetItems() {
        const result = list.map(listItem => {
            if (listItem.select) {
                listItem.select = false
                listItem.error = false
                listItem.styles = {}
            }

            return listItem 
        })
        setList(result)
        setMatchError(false)
    }

    function checkMatch(item) {
        if (itemsActive == 1) return 
        
        if (isAbleToConferMatch() && isCorrectMatch()) {
           removeItemsSelect()
        } else {
            updateItem(item, 'error')
            setMatchError(true)
        }
    }

    function isAbleToConferMatch() {
        return selectedTypeQuantity('country') === 1 && selectedTypeQuantity('capital') === 1
    }

    function isCorrectMatch() {
        const country = list.find(item => item.select && item.type === 'country')
        const capital = list.find(item => item.select && item.type === 'capital')

        return data[country.value] === capital.value
    }

    function selectedTypeQuantity(type) {
         const quantity = list.filter(item => { 
            if (item.select && item.type === type) {
                return item
            }
        }).length

        return quantity
    }


    function removeItemsSelect() {
        const result = list.filter(item => !item.select )
        setList(result)
    }
    
    return (
       <>
            {list.length ? list.map(item => (
                <button 
                    onClick={() => handleClick(item)}
                    style={item.styles}
                    key={item.value} 
                >
                    {item.value}
                </button>
            )) : 'Congratulations'}
       </>
    )
}
