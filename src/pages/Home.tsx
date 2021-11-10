import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export  interface taskEdit {
  taskId: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSamTitle = tasks.find(task => task.title === newTaskTitle)

    if(taskWithSamTitle) {
      return Alert.alert('Você não pode cadastrar uma task com o mesmo nome.')

    }else {
      const newTask ={ 
        id: new Date().getTime(),
        title: newTaskTitle,
        done:  false
      }
  
      setTasks(oldTask => [...oldTask, newTask]);
    }

  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({...task}) )

    const foundItem = updatedTasks.find(task => task.id === id)

    if(!foundItem) 
      return

    foundItem.done = !foundItem.done;
    
    setTasks(updatedTasks)

  }

  function handleRemoveTask(id: number) {
    

    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
      style: 'destructive',
      text: 'Sim',
      onPress: () => {
        const updatedTasks = tasks.filter(task => task.id !== id)
        setTasks(updatedTasks);
        }
      },
      {
        style: 'cancel',
        text: 'Não'
      }
    ]
    )
  }

  function handleEditTask ({taskId, taskNewTitle}: taskEdit) {
    const updatedTasks = tasks.map(task => ({...task}) );
    const  taskEdit = updatedTasks.find(task =>  task.id === taskId);

    if(!taskEdit) 
      return;
      taskEdit.title = taskNewTitle

      setTasks(updatedTasks)  
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})