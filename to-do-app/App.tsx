import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Note {
  id: string;
  text: string;
}

export default function NotesApp() {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes !== null) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  const saveNotes = async (updatedNotes: Note[]) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  const addNote = () => {
    if (noteText.trim() !== "") {
      const newNote: Note = {
        id: Date.now().toString(),
        text: noteText,
      };

      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
      setNoteText("");
    }
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={noteText}
          onChangeText={setNoteText}
          placeholder="Enter a note"
        />
        <TouchableOpacity style={styles.add} onPress={addNote}>
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
      </View>
      {notes.length === 0 ? (
        <Text style={styles.nothingText}>Nothing to do</Text>
      ) : (
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <View style={styles.noteItem}>
              <Text style={styles.noteText}>{item.text}</Text>

              <TouchableOpacity
                style={styles.delete}
                onPress={() => deleteNote(item.id)}
              >
                <Text style={styles.text}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.notesList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginTop: "10%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#0089BA",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
    marginTop: 26,
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  noteText: {
    flex: 1,
    marginRight: 8,
  },
  notesList: {
    flex: 1,
  },
  nothingText: {
    fontSize: 25,
    textAlign: "center",
    marginVertical: "50%",
    color: "#aaa",
  },
  add: {
    padding: 10,
    backgroundColor: "#0089BA",
    justifyContent: "center",
    borderRadius: 4,
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  delete: {
    backgroundColor: "#C34A36",
    padding: 10,
    borderRadius: 4,
  },
});
