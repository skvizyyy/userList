import { useState } from 'react'
import Button from '../UI/Button';
import Card from '../UI/Card';
import styles from './CreateUser.module.css'
import ErrorModal from '../UI/ErrorModal';

const CreateUser = (props) => {
    const [inputName, setInputName] = useState('')
    const [inputAge, setInputAge] = useState('')
    const [error, setError] = useState('')

    const createUserHandler = (event) => {
        event.preventDefault()
        console.log(inputName, inputAge)
        if (inputName.trim().length === 0) {
            setError({
                title: 'Некорректный ввод',
                message: 'Поля ввода не могут быть пустыми!'
            })
            return
        }
        if (+inputAge < 1 || +inputAge > 100) {
            setError({
                title: 'Неккоректный возраст',
                message: 'Возраст должен быть больше ноля!'
            })
            return
        }
        props.onCreateUser(inputName, inputAge)

        setInputName('');
        setInputAge('');
    }

    const nameChangeHandler = (event) => {
        setInputName(event.target.value)
    }

    const ageChangeHandler = (event) => {
        setInputAge(event.target.value)
    }
    const errorHandler = () => {
        setError(false)
    }

    return (
        <>
            {error
                && <ErrorModal 
                onCloseModal={errorHandler} title={error.title}
                    message={error.message}></ErrorModal>}
            <Card className={styles.input}>
                <form onSubmit={createUserHandler}>
                    <label htmlFor="name">Имя</label>
                    <input id='name' type='text' onChange={nameChangeHandler} value={inputName} />

                    <label htmlFor="age">Возраст</label>
                    <input id='age' type='number' onChange={ageChangeHandler} value={inputAge} />

                    {/* <button type='submit'>Добавить пользователя</button> */}
                    <Button type="submit">Добавить пользователя</Button>
                </form>
            </Card>
        </>

    )

}
export default CreateUser