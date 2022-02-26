import {GraphQLServer} from 'graphql-yoga';

//Type Definitions(schema)
const typeDefs=`
type Query{
    me:Machine!
    machines(query:String):[Machine!]!
    sensors(query:String):[Sensor!]!
    SensorData:[SensorDataPoint!]!
    sensor:Sensor!
}   
type Machine{
    id:ID
    name:String!
    sensors:[Sensor!]!
    lastKnownPosition: GPSPosition
}
type Sensor{
    id:ID!
    name:String!
    machine:Machine!
}
type GPSPosition {
    id:ID,
    lat:Float,
    lon:Float,
    machine:ID
    }  
type SensorDataPoint{
    id:ID!
    text:String!
    machine:ID!
}
`
const machines=[{
    id:'1',
    name:'Machine 01'
},
{
    id:'2',
    name:'Machine 02'
},
{
    id:'3',
    name:'Machine 03'
}]

const sensors=[{
    id:'10',
    name:'GraphQL 101',
    machine:'1'
},
{
    id:'11',
    name:'GraphQL 201',
    machine:'1'
},
{
    id:'12',
    name:'Programming Music',
    machine:'2'
}]

const GPSPositions=[{
    id:'80',
    lat:12.002,
    lon:50.001,
    machine:'1'
},
{
    id:'81',
    lat:122.002,
    lon:20.001,
    machine:'2'
},
{
    id:'82',
    lat:124.002,
    lon:504.001,
    machine:'3'
}]

const SensorData =[{
    id:'21',
    text:'12/02/2022',
    machine:'1'
    },{
        id:'22',
    text:'22/02/2022',
    machine:'2'
    }
]
//Resolvers
const resolvers ={
    Query:{
        machines(parent,args,ctx,info){
            if(!args.query){
                return machines
            }
            return machines.filter((machine)=>{
                return machine.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        sensors(parent,args,ctx,info){
            if(!args.query){
                return sensors
            }
            return sensors.filter((sensor)=>{
                const isTitleMatch = sensor.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = sensor.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        me(){
            return{
                id:'123098',
                name:'Mike'
            }
        },
        sensor(){
            return sensors
        },
        SensorData(){
            return SensorData
        }
    },
    Sensor:{
        machine(parent,args,ctx,info){
            return machines.find((machine)=>{
                return machine.id===parent.machine
            })
        }
    },
    Machine:{
        sensors(parent,args,ctx,info){
            return sensors.filter((sensor)=>{
                return sensor.machine===parent.id
            })
        },
        lastKnownPosition(parent,args,ctx,info){
            return GPSPositions.find((GPSPosition)=>{
                return GPSPosition.machine=parent.id
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(()=>{
    console.log('The server is up!')
})