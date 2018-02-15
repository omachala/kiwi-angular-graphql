export class AllFlights {

    __args: Object;
    edges: Object = {
        node: {
            id: true,
            price: {
                amount: true,
                currency: true
            },
            bookingUrl: true,
            duration: true,
            airlines:
                {
                    name: true
                }
            ,
            departure: {
                airport: {
                    name: true
                },
                time: true,
                localTime: true
            },
            arrival: {
                airport: {
                    name: true
                },
                time: true,
                localTime: true
            }
        }
    };

}
