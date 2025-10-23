import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { FlatList } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('all');

  const addTasks = (text) => {
    if (text.trim()) {
      const new_task = {
        id: Date.now().toString(),
        text: text,
        completed: false
      };
      setTasks(prev => [new_task, ...prev]);
      setInputText('');
    };
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };


  const getFilteredTasks = () => {
    if (filter === 'all') {
      return tasks;
    } else if (filter === 'active') {
      return tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
  };

  const getTasksStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;

    return { total, completed, active };
  };

  const stats = getTasksStats();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingHorizontal: 8,
    },

    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },

    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#666'
    },

    content: {
      flex: 1,
    },

    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },

    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#6700a2ff',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 15,
      backgroundColor: '#f4e1fdff',
      fontFamily: 'monospace'
    },

    addButton: {
      marginLeft: 8,
      backgroundColor: '#6700a2ff',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },

    addButtonText: {
      color: '#f4e1fdff',
      fontSize: 15,
      fontWeight: 'bold',
    },

    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },

    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#6700a2ff',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 15,
      backgroundColor: '#f4e1fdff',
      fontFamily: 'monospace'
    },

    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 10,
      marginBottom: 10,
    },

    filterButton: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 8,
      marginHorizontal: 4,
      backgroundColor: '#e0e0e0',
    },

    clearButton: {
      backgroundColor: '#8909d3d2',
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 20,
      alignSelf: 'center',
      marginBottom: 15,
    },

    activeFilter: {
      backgroundColor: '#8909d3d2',
    },

    inactiveFilter: {
      backgroundColor: '#e0e0e0',
    },

    noteItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#f4e1fdff',
      padding: 10,
      marginVertical: 5,
      borderRadius: 10,
      borderWidth: 1,          
      borderColor: '#6700a2ff',
    },

    noteText: {
      fontSize: 16,
      flex: 1,
      color: '#000',
    },

    buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    completeButton: {
      padding: 6,
      borderRadius: 8,
      backgroundColor: '#e8f5e9',
      marginRight: 6,
    },

    completeText: {
      color: '#2e7d32', 
      fontSize: 18,
      fontWeight: 'bold',
    },

    deleteButton: {
      padding: 6,
      borderRadius: 8,
      backgroundColor: '#ffebee', 
    },

    deleteText: {
      color: '#d32f2f', 
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Менеджер задач</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, filter === 'all' && styles.activeFilter]} onPress={() => setFilter('all')}>
          <Text>Все ({getTasksStats().total})</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.filterButton, filter === 'active' && styles.activeFilter]} onPress={() => setFilter('active')}>
          <Text>Активные ({getTasksStats().active})</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.filterButton, filter === 'completed' && styles.activeFilter]} onPress={() => setFilter('completed')}>
          <Text>Выполненные ({getTasksStats().completed})</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.content}>
        <View style={styles.tabContent}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск задач..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Новая заметка...'
              placeholderTextColor={'#888'}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={addTasks}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => addTasks(inputText)}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View>
              <TouchableOpacity style={styles.clearButton} onPress={() => setTasks(prev => prev.filter(task => !task.completed))}>
                <Text style={{ color: '#000000ff' }}>Очистить выполненные</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={getFilteredTasks()}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.noteItem}>
                  <Text style={styles.noteText}>{item.text}</Text>

                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.completeButton}>
                      <Text style={styles.completeText}>{item.completed ? '✓' : '○'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
                      <Text style={styles.deleteText}>x</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
