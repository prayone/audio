父子组件传值：
使用props：
    1.父组件：传code
        <child code={code} chageCode={chageCode}/>
    2.子组件：接收code并修改code
        const receive = (props)=>{
            console.log(props.code)
            改变父组件值：
            props.chageCode('newCode')
        }