import { useState } from "react"
import { Isprites } from "../../../domain/pokemon/dataPokemon.model"
import './style.css'
interface IpropsSpritesCarrossel {
    sprites: Isprites
    pixels: number
}

enum enumTransition {
    next,
    prev
}

export function SpritesCarrossel({sprites,pixels}:IpropsSpritesCarrossel){
    const [idx,setIdx] = useState<number>(0)

    delete sprites.other
    delete sprites.versions
    let arraySprites: string[] = [] 

    //@ts-ignore
    Object.keys(sprites).forEach((key)=>arraySprites.push(sprites[key]))
    arraySprites = arraySprites.filter(sprite=>sprite !== null)

    function handleTransition(transition: enumTransition){
        if(transition === enumTransition.prev){
            if(idx >= 1){
                setIdx(idx - 1)
            }
        }

        if(transition === enumTransition.next){
            if(idx < arraySprites.length - 1){
                setIdx(idx + 1)
            }
        }
    }

    return(
        <div>
            <div className="wrapperCarrossel">
                <button 
                    className="btnTransition"
                    title="Imagem Anterior"
                    onClick={()=>handleTransition(enumTransition.prev)}
                >Anterior</button>
                <img src={arraySprites[idx]} key={arraySprites[idx]} alt={`${arraySprites[idx]}`} width={pixels} height={pixels}/>
                <button 
                    className="btnTransition"
                    title="Próxima Imagem"
                    onClick={()=>handleTransition(enumTransition.next)}
                >Próximo</button>
            </div>
            <div className="wrapperprogress">
                <div className="progressCarrossel" >
                    {arraySprites.map((sprt,_idx)=>(
                        <div
                            style={{background: _idx === idx ? '#61dafb' : 'black'}}
                            key={_idx} 
                            className="itemProgress"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    )
}