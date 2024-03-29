import { useRef, useState } from 'react';
import './App.css'
import todo_logo from './assets/todo.png'
import react_logo from './assets/react.svg'

interface todo {
    done: boolean;
    desc: string;
}

function App() {

    const [item_list, set_item_list] = useState<todo[]>([]);
    const pippo = useRef<HTMLInputElement>(null);

    function add_item(event: React.FormEvent){
        event.preventDefault();

        const text = pippo.current?.value;

        set_item_list((old_list) => {
            if (text && pippo.current){
                old_list = [{done: false, desc: text}, ...old_list];
                pippo.current.value = "";
            }

            console.log(old_list);

            return old_list;
        });
    }

    function toggle_done(index: number){
        console.log(index)

        set_item_list((old_list) => old_list.map((x, i) => {
            if (i === index){
                return {
                    ...x,
                    done: !x.done
                };
            }
            return x;
        }));

    }

    function toggle_edit(index: number){

        const divelement = document.getElementById(`${index}-div`) as HTMLDivElement;
        const edit = (divelement).children[2] as HTMLButtonElement;
        const input = (divelement).children[1] as HTMLInputElement;

        if(edit.innerText === "Modifica"){
            edit.innerText = "Salva";
        } else {
            edit.innerText = "Modifica";
        }

        input.disabled = !input.disabled;
    }

    const on_input_change = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;

        set_item_list((old_list) => old_list.map((x, i) => {
            if (i === index){
                return {
                    ...x,
                    desc: val
                };
            }
            return x;
        }));
    }

    return (
        <div>
            <div className="title-box">
                <div>
                    <img src={todo_logo} alt="todo" width={50} height={50} style={{marginRight: "10px", alignSelf: "center"}}/>
                    <span className='title'>+</span>
                    <img src={react_logo} alt="react" width={50} height={50} style={{marginLeft: "10px", alignSelf: "center"}}/>
                </div>
                <span className="title">TODO APP</span>
            </div>
            <div>
                <form className={"form"} onSubmit={add_item}>
                    <input className="input-box" placeholder='Inserisci elemento' ref={pippo}></input>
                    <button className="send-button">Salva</button>
                </form>
            </div>
            <div>
                {
                    item_list.map((x, i) => 
                    <div key={i} id={`${i}-div`} className={"todo-element"}>
                        <input className="checkbox"  onChange={() => toggle_done(i)} checked={x.done} type='checkbox'></input>
                        <input onChange={on_input_change(i)} type='text' disabled={true} className={`list-item ${x.done ? 'done' : ''}`} value={x.desc}></input>
                        <button className="edit-button" onClick={() => toggle_edit(i)}>Modifica</button>
                        <button className="delete-button" onClick={() => set_item_list((old_list) => old_list.filter((_, index) => index != i))}>Rimuovi</button>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default App
