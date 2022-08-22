import { BlobItem, ContainerClient } from "@azure/storage-blob";
import React from "react";
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import "./shims";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

export default function App() {
  const containerClient = new ContainerClient(
    process.env.BLOB_CONTAINER_SAS_URL || "container-sas-url"
  );
  const [image, setImage] = React.useState({ uri: "https://reactjs.org/logo-og.png" });
  const [blobItems, setBlobItems] = React.useState<BlobItem[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | undefined>(undefined);

  loadBlobItems(containerClient, setBlobItems);

  const renderItem = ({ item }) => {
    const backgroundColor = item.name === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.name === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => onItemPress(item.name)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const onItemPress = async (name: string) => {
    setSelectedId(name);
    const resp = await containerClient.getBlobClient(name).download();
    const blob = await resp.blobBody;
    if (blob) {
      var reader = new FileReader();
      const dataUrl = await new Promise((res) => {
        reader.onload = function() {
          res(reader.result);
        };
        reader.readAsDataURL(blob);
      });
      setImage({ uri: dataUrl });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick your favorite</Text>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="stretch" style={styles.image}>
          <FlatList
            data={blobItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            extraData={selectedId}
          />
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});

async function loadBlobItems(containerClient: ContainerClient, setter: (items: BlobItem[]) => {}) {
  const results = [];
  for await (const blobItem of containerClient.listBlobsFlat()) {
    if (blobItem.name.endsWith(".jpg") || blobItem.name.endsWith(".png")) {
      results.push(blobItem);
    }
  }
  setter(results);
}
