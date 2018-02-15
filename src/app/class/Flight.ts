export class Flight {

    id: string;
    price: {
        amount: number,
        currency: string
    };
    bookingUrl: string;
    duration: number;
    airlines: Array<Object>;
    departure: {
        airport: {
            name: string
        };
        time: Date,
        localTime: Date
    };
    arrival: {
        airport: {
            name: string
        },
        time: Date,
        localTime: Date
    };

}