import React, {useState, useRef,useEffect} from 'react'
import {View, TouchableOpacity,Text,Image,StyleSheet, TextInput  } from "react-native"
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

import {Task} from  "./TasksList"
import {taskEdit} from '../pages/Home'

interface TasksItemProps {
  tasks: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({taskId, taskNewTitle}:taskEdit) => void;
}

export function TaskItem({tasks, removeTask, toggleTaskDone, editTask}: TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskEditing, setTaskEditing] = useState(tasks.title);
  const textInputRef =  useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function haandleCancelEditing() {
    setTaskEditing(tasks.title);
    setIsEditing(false);
  }

  function handleSubmit() {
    editTask({taskId: tasks.id, taskNewTitle: tasks.title})
    setIsEditing(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])
  

    return(
        <View  style={styles.container} >
          <View style={styles.infoContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={()=> toggleTaskDone(tasks.id)}
          >
            <View 
              //TODO - use style prop 
              style={tasks.done ? styles.taskMarkerDone : styles.taskMarker}
            >
              { tasks.done && (
                <Icon 
                  name="check"
                  size={12}
                  color="#FFF"
                />
              )}
            </View>

            <TextInput
              value={taskEditing}
              onChangeText={setTaskEditing}
              editable={isEditing}
              onSubmitEditing={handleSubmit}
              style={tasks.done ? styles.taskTextDone :styles.taskText}
              ref={textInputRef}
            />

          </TouchableOpacity>
        </View>

        <View style={styles.iconsContainer} > 
          {isEditing ?(
            <TouchableOpacity
              onPress={haandleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />

          </TouchableOpacity>
          ): (
            <TouchableOpacity

            onPress={handleStartEditing}
          //TODO - use onPress (remove task) prop
        >
          <Image source={editIcon} />

        </TouchableOpacity>
          )}

          <View style={styles.iconsDivider}/>
            <TouchableOpacity
              onPress={() => removeTask(tasks.id)}
              disabled={isEditing}
            >
              <Image  source={trashIcon} style={{opacity: isEditing ? 0.2 : 1}} />
            </TouchableOpacity>
        
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
     justifyContent: 'space-between'
  },
  infoContainer: {
    flex: 1,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24
  },
  iconsDivider: {
    height: 24,
    width: 1,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12
  }

})