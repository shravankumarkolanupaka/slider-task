import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, FlatList, Platform, Image } from 'react-native'
import React, { useState } from 'react'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
const { width, height } = Dimensions.get('screen');
import ImagePicker from 'react-native-image-crop-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
const CustomSliderComp = () => {
  const [isSelectedchangeparam, setisSelectedchangeparam] = useState(false)
  const [isAddPhoto, setisAddPhoto] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [parameter, setParameter] = useState("")
  const [uri, setUri] = useState("")
  const [showModl, setShowmodal] = useState(false)
  const [sliderInfo, setSliderInfo] = useState([])
  const [updatedId, setUpdatedId] = useState(0)
  // const [RadiobtnInfo, setRadiobtnInfo] = useState(
  // [
  //  {
  //      id:1,
  //      radiobtntext:"Change Parameter",
  //      checked:0
  //  },
  //  {
  //      id:2,
  //      radiobtntext:"Add Image",
  //      checked:0
  //  }
  // ]
  // )

  const [openChangeParameter, setopenchangeparam] = useState(false)
  const [parameterInfo, setParameterInfo] = useState([
    {
      id: 1,
      parameter: "Parameter1"
    },
    {
      id: 2,
      parameter: "Parameter2"
    },
    {
      id: 3,
      parameter: "Parameter3"
    },
    {
      id: 4,
      parameter: "Parameter4"
    }
  ])

  const showModal = () => {
    setModalVisible(true)
  }
  const cancelModel = () => {
    setModalVisible(false)
  }
  const cancelModl = () => {
    setShowmodal(false)
  }
  const updateParameterValue = (id) => {
    console.log(id, "==========indexxxxxxxxx")
    setUpdatedId(id)
    setShowmodal(true)

  }
  const selectedParameter = (paramName) => {
    console.log(paramName, "=====paramName")
    setParameter(paramName)
  }
  const selectImagefromGallery = () => {
    if (Platform.OS == "android") {
      request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        }).then(image => {
          console.log(image, "=======image");
          setUri(image.path);
        });
      });
    }
  }


  const addParams = () => {
    var date = new Date();
    let hour = date.getHours();
    var ampm = hour >= 12 ? 'pm' : 'am';
    hours = hour % 12;
    let hours = hours ? hours : 12;
    console.log(hours, "=======hours")
    console.log(ampm, "===========ampm")
    const sliderdata = {
      id: Math.floor(Math.random() * 1000),
      curr_time: hours,
      ampm: ampm,
      parametername: parameter,
      imageUri: uri
    }
    console.log(sliderdata, "=========sliderInfooooo")
    let sliderInformation = [...sliderInfo, sliderdata]
    console.log(sliderInformation, "======sliderDataaaaaaa")
    setSliderInfo(sliderInformation)
  }
  const selectedRadioBtn = (id) => {
    if (id == 0) {
      setisSelectedchangeparam(!isSelectedchangeparam)
    } else {
      setisAddPhoto(!isAddPhoto)
    }
  }
  const Item = ({ item, index }) => (
    <View style={styles.sliderparam}>
      <View style={styles.parameterIndex}>
        <Text style={styles.indexNumber}>{index + 1}</Text>
      </View>
      <TouchableOpacity style={styles.parameterName} onPress={() => updateParameterValue(item.id)}>
        <View style={styles.sliderText}>
          <Text style={{ color: "#1A73E8", fontWeight: "bold", fontSize: 15 }}>{item.parametername}</Text>
          <Text style={styles.currenttime}>{item.curr_time}<Text style={styles.currenttime}>{item.ampm}</Text></Text>
        </View>
        <Image source={{ uri: item.imageUri }} style={{ width: 55, height: 55, resizeMode: "contain", borderRadius: 50, marginLeft: responsiveWidth(1.5) }} />
      </TouchableOpacity>
    </View>
  );
  const updateParamsValue = () => {
    var date = new Date();
    let hour = date.getHours();
    var ampm = hour >= 12 ? 'pm' : 'am';
    hours = hour % 12;
    let hours = hours ? hours : 12;
    const sliderdata = {
      id: Math.floor(Math.random() * 1000),
      curr_time: hours,
      ampm: ampm,
      parametername: parameter,
      imageUri: uri
    }
    console.log(updatedId, "=======updatedIdddddddd")
    const indexToUpdate = sliderInfo.findIndex(data => data.id === updatedId);
    const updatedSliderInfo = [...sliderInfo];
    if (indexToUpdate !== -1) {
      updatedSliderInfo[indexToUpdate] = sliderdata;
    } else {
      const insertIndex = 0;
      updatedSliderInfo.splice(insertIndex, 0, sliderdata);
    }

    console.log("=======updatedSliderInfo", updatedSliderInfo);

    setSliderInfo(updatedSliderInfo);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <FlatList
            data={sliderInfo}
            renderItem={({ item, index }) => <Item item={item} index={index} />}
            keyExtractor={(item, index) => item.id}
          />
        </View>
        <View></View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalText}>Add</Text>
              <Text style={styles.deleteText}>Delete</Text>
            </View>
            <View style={styles.parameterContainer}>
              <View style={styles.radioBtnContainer}>
                <TouchableOpacity onPress={() => selectedRadioBtn(0)}>
                  <View style={styles.radioContiner}>
                    {isSelectedchangeparam == true ? <View style={styles.radioFilled} /> : null}
                  </View>
                </TouchableOpacity>
                <Text style={styles.changeparamtext}>Change Parameter</Text>
              </View>
              {isSelectedchangeparam == true ?
                <View style={{ marginVertical: responsiveHeight(2) }}>
                  {parameterInfo.map((param, index) => (
                    <TouchableOpacity style={[styles.paramtervalue]} onPress={() => selectedParameter(param?.parameter)} key={index}><Text style={{ color: "black", fontWeight: "bold" }}>{param.parameter}</Text></TouchableOpacity>
                  ))}
                </View> : null}
              <View style={styles.radioBtnContainer}>
                <TouchableOpacity onPress={() => selectedRadioBtn(1)}>
                  <View style={styles.radioContiner}>
                    {isAddPhoto == true ? <View style={styles.radioFilled} /> : null}
                  </View>
                </TouchableOpacity>
                <Text style={styles.addImageText}>Add Image</Text>
              </View>
              {isAddPhoto == true ?
                <View style={styles.addimageContainer}>
                  <TouchableOpacity style={styles.addplusimagecontainer} onPress={() => selectImagefromGallery()}>
                    <Text style={{ fontSize: 30, color: "black" }}>+</Text>
                  </TouchableOpacity>
                </View>
                : null
              }
            </View>
            <View style={styles.btncontainer}>
              <TouchableOpacity style={styles.cancelbtn}><Text style={{ color: "white" }} onPress={() => cancelModel()}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.addbtn} onPress={() => addParams()}><Text style={{ color: "white" }}>Add</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModl}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalText}>Edit</Text>
              <Text style={styles.deleteText}>Delete</Text>
            </View>
            <View style={styles.parameterContainer}>
              <View style={styles.radioBtnContainer}>
                <TouchableOpacity onPress={() => selectedRadioBtn(0)}>
                  <View style={styles.radioContiner}>
                    {isSelectedchangeparam == true ? <View style={styles.radioFilled} /> : null}
                  </View>
                </TouchableOpacity>
                <Text style={styles.changeparamtext}>Change Parameter</Text>
              </View>
              {isSelectedchangeparam == true ?
                <View style={{ marginVertical: responsiveHeight(2) }}>
                  {parameterInfo.map((param, index) => (
                    <TouchableOpacity style={[styles.paramtervalue]} onPress={() => selectedParameter(param?.parameter)} key={index}><Text style={{ color: "black", fontWeight: "bold" }}>{param.parameter}</Text></TouchableOpacity>
                  ))}
                </View> : null}
              <View style={styles.radioBtnContainer}>
                <TouchableOpacity onPress={() => selectedRadioBtn(1)}>
                  <View style={styles.radioContiner}>
                    {isAddPhoto == true ? <View style={styles.radioFilled} /> : null}
                  </View>
                </TouchableOpacity>
                <Text style={styles.addImageText}>Add Image</Text>
              </View>
              {isAddPhoto == true ?
                <View style={styles.addimageContainer}>
                  <TouchableOpacity style={styles.addplusimagecontainer} onPress={() => selectImagefromGallery()}>
                    <Text style={{ fontSize: 30, color: "black" }}>+</Text>
                  </TouchableOpacity>
                </View>
                : null
              }
            </View>
            <View style={styles.btncontainer}>
              <TouchableOpacity style={styles.cancelbtn}><Text style={{ color: "white" }} onPress={() => cancelModl()}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.addbtn} onPress={() => updateParamsValue()}><Text style={{ color: "white" }}>Update</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.footer}>
        <View style={styles.addParambtnContainer}>
          <TouchableOpacity onPress={() => showModal()}>
            <View style={styles.addContainer}>
              <Text style={styles.plusbtn}>+</Text>
            </View>
          </TouchableOpacity>
          <View><Text style={styles.addBtn}>Add</Text></View>

        </View>
        <View style={styles.updateContainer}>
          <Text style={styles.updatebtn}>Update</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  height:responsiveHeight(100),
    //  width:responsiveWidth(100)
  },
  header: {
    width: responsiveWidth(100),
    height: responsiveHeight(85),
    backgroundColor: "red"
  },
  footer: {
    width: responsiveWidth(100),
    height: responsiveHeight(14),
    // backgroundColor:"yellow",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5)
  },
  addContainer: {
    borderWidth: 2,
    borderColor: "#1A73E8",
    width: responsiveWidth(8),
    height: responsiveHeight(4),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
    //  backgroundColor:"blue",
    //  justifyContent:"center"
  },
  updateContainer: {
    width: responsiveWidth(40),
    height: responsiveHeight(7),
    backgroundColor: "#1A73E8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  addParambtnContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  addBtn: {
    fontSize: responsiveFontSize(2.5),
    color: "#1A73E8",
    marginLeft: responsiveWidth(2)
  },
  updatebtn: {
    fontSize: responsiveFontSize(2.5),
    color: "#ffffff",
    fontWeight: "bold"
  },
  plusbtn: {
    color: "#1A73E8",
    fontSize: 20
  },
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  modalView: {
    backgroundColor: "white",
    width: responsiveWidth(100),
    height: responsiveHeight(65),
    alignSelf: "center",
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(2),
  },
  modalText: {
    color: "#1A73E8",
    fontSize: responsiveFontSize(2.5)
  },
  deleteText: {
    color: "black",
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold"
  },
  modalTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(1.5),
    height: responsiveHeight(5),
    // backgroundColor:"pink"
  },
  item: {
    flexDirection: "row",

  },
  radioContiner: {
    width: responsiveWidth(6),
    height: responsiveHeight(3),
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  radioFilled: {
    width: responsiveWidth(4),
    height: responsiveHeight(2),
    backgroundColor: "#1A73E8",
    borderRadius: 50
  },
  parameterContainer: {
    height: responsiveHeight(48),
    width: responsiveWidth(95),
    // backgroundColor:"pink"
  },
  radioBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: responsiveHeight(1)
  },
  changeparamtext: {
    paddingLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(2),
    color: "black",
    fontWeight: "bold"
  },
  addImageText: {
    paddingLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(2),
    color: "black",
    fontWeight: "bold"
  },
  paramtervalue: {
    width: responsiveWidth(70),
    height: responsiveHeight(5),
    backgroundColor: "#1A73E8",
    marginLeft: responsiveWidth(8),
    marginBottom: responsiveHeight(1),
    justifyContent: "center",
    paddingLeft: responsiveWidth(2),
    borderRadius: 10
  },
  addimageContainer: {
    width: responsiveWidth(15),
    height: responsiveHeight(7),
    backgroundColor: "#1A73E8",
    borderRadius: 10,
    marginLeft: responsiveWidth(8),
    justifyContent: "center",
    alignItems: "center"
  },
  addplusimagecontainer: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  btncontainer: {
    width: responsiveWidth(80),
    height: responsiveHeight(5),
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between"
  },
  cancelbtn: {
    width: responsiveWidth(30),
    height: responsiveHeight(5),
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  addbtn: {
    width: responsiveWidth(30),
    height: responsiveHeight(5),
    backgroundColor: "#1A73E8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  sliderparam: {
    width: responsiveWidth(60),
    height: responsiveHeight(10),
    backgroundColor: "lightgrey",
    borderRadius: 20,
    marginBottom: responsiveHeight(2),
    flexDirection: "row"
  },
  parameterIndex: {
    width: responsiveWidth(20),
    height: responsiveHeight(10),
    borderTopLeftRadius: 20,
    backgroundColor: "#1a73e8",
    borderBottomLeftRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  parameterName: {
    // width:responsiveWidth(40),
    // height:responsiveHeight(10),
    flexDirection: "row",
    alignItems: "center"
  },
  sliderText: {

  },
  indexNumber: {
    color: "white",
    fontSize: responsiveFontSize(2),
    fontWeight: "bold"
  },
  currenttime: {
    color: "black",
    fontWeight: "bold"
  }

})
export default CustomSliderComp