import { useState } from "react";
import {
  Heart,
  LoaderCircle,
  MailCheck,
  Search,
} from "lucide-react";

import SectionReveal from "./SectionReveal";
import GuestCheckerModal from "./GuestCheckerModal";
import { submitRsvp } from "../utils/sheets";


const initialForm = {
  name: "",
  email: "",
  guests: "1",
  attending: "yes",
  message: "",
};



function validate(form){

  const errors = {};

  if(!form.name.trim()){
    errors.name = "Full name is required.";
  }


  if(!form.email.trim()){
    errors.email = "Email is required.";
  }
  else if(
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  ){
    errors.email = "Enter a valid email.";
  }


  return errors;

}




export default function RSVP({
  guestList,
  verifiedName,
  onVerifiedName
}){


  const [verified,setVerified] = useState(false);

  const [modalOpen,setModalOpen] = useState(false);


  const [form,setForm] = useState({
    ...initialForm,
    name: verifiedName || "",
  });


  const [errors,setErrors] = useState({});


  const [status,setStatus] = useState("idle");



  const updateField=(key,value)=>{

    setForm(current=>({
      ...current,
      [key]:value
    }));

    setErrors(current=>({
      ...current,
      [key]:undefined
    }));

  };




  const confirmGuest=(name)=>{


    onVerifiedName(name);

    setVerified(true);

    setForm(current=>({
      ...current,
      name
    }));

    setModalOpen(false);


  };





  const handleSubmit=async(e)=>{

    e.preventDefault();


    const validation=validate(form);

    setErrors(validation);


    if(Object.keys(validation).length){
      return;
    }



    setStatus("loading");



    try{


      await submitRsvp({

        name:form.name,

        email:form.email,

        guests:Number(form.guests),

        attending:
          form.attending==="yes"
          ?"Yes"
          :"No",

        message:form.message

      });



      setStatus("success");


    }
    catch(error){

      console.error(error);

      setStatus("error");

    }


  };





return (

<section
id="rsvp"
className="
relative
overflow-hidden
bg-gradient-to-b
from-cream
via-blush-100/30
to-cream
px-5
py-24
sm:px-8
sm:py-32
"
>



{/* pink background */}

<div
className="
absolute
-right-32
-top-20
h-72
w-72
rounded-full
bg-blush-200/50
blur-3xl
"
/>


<div
className="
absolute
-bottom-20
-left-20
h-80
w-80
rounded-full
bg-blush-100/70
blur-3xl
"
/>




<SectionReveal
className="
relative
mx-auto
w-full
max-w-6xl
"
>


<div
className="
grid
gap-10
lg:grid-cols-[0.8fr_1.2fr]
"
>




{/* LEFT */}

<div>


<p className="section-kicker">
Répondez s'il vous plaît
</p>


<h2
className="
section-title
"
>
Celebrate with us
</h2>


<p
className="
mt-5
max-w-md
text-sm
leading-7
text-navy-800/70
"
>

We would love to know if you
can join our special day.

</p>




<button

type="button"

onClick={()=>setModalOpen(true)}

className="
mt-8
inline-flex
items-center
gap-2
rounded-full
border
border-navy-900
px-7
py-3
text-xs
font-semibold
uppercase
tracking-[0.2em]
text-navy-900
transition
hover:bg-navy-900
hover:text-cream
"

>

<Search size={16}/>

Am I Invited?

</button>




{verifiedName && (

<div
className="
mt-5
flex
items-center
gap-3
rounded-2xl
border
border-blush-200
bg-beige-100
p-4
text-sm
text-navy-900
"
>

<MailCheck
size={18}
className="text-gold"
/>


Guest verified:
<strong>
{verifiedName}
</strong>


</div>

)}



</div>






{/* RIGHT CARD */}


<div
className="
rounded-[2rem]
border
border-blush-200/60
bg-beige-100
p-6
shadow-luxe
sm:p-10
"
>



{/* NOT VERIFIED */}

{!verified && (

<div
className="
grid
min-h-[420px]
place-items-center
text-center
"
>


<div>

<Heart
size={42}
className="
mx-auto
mb-6
text-blush-500
"
fill="currentColor"
/>



<h3
className="
font-display
text-5xl
text-navy-900
"
>

Confirm your invitation

</h3>



<button

type="button"

onClick={()=>setModalOpen(true)}

className="
button-primary
mt-8
"

>

Check Guest List

</button>


</div>


</div>

)}







{/* SUCCESS */}

{status==="success" && (

<div
className="
grid
min-h-[420px]
place-items-center
text-center
"
>

<div>


<div
className="
mx-auto
mb-6
grid
h-20
w-20
place-items-center
rounded-full
bg-blush-200
text-navy-900
"
>

<Heart
fill="currentColor"
/>

</div>



<h3
className="
font-display
text-5xl
text-navy-900
"
>

Thank you

</h3>



<p
className="
mt-4
text-sm
text-navy-800/70
"
>

Your RSVP has been received.

</p>


</div>


</div>

)}







{/* FORM */}

{verified && status!=="success" && (

<form
onSubmit={handleSubmit}
className="space-y-5"
>



<div>

<label className="label">
Full Name
</label>


<input

className="field"

value={form.name}

onChange={
e=>updateField(
"name",
e.target.value
)
}

/>

</div>





<div>

<label className="label">
Email
</label>


<input

type="email"

className="field"

value={form.email}

onChange={
e=>updateField(
"email",
e.target.value
)
}

/>

</div>





<div>


<label className="label">
Number of Guests
</label>


<select

className="field"

value={form.guests}

onChange={
e=>updateField(
"guests",
e.target.value
)
}

>

{
[1,2,3,4,5].map(num=>(

<option key={num}>
{num}
</option>

))
}


</select>


</div>





<div>


<label className="label">
Attending
</label>


<div
className="
grid
grid-cols-2
gap-3
"
>


<label className="field">

<input

type="radio"

name="attending"

checked={
form.attending==="yes"
}

onChange={()=>
updateField(
"attending",
"yes"
)
}

/>

Yes

</label>




<label className="field">

<input

type="radio"

name="attending"

checked={
form.attending==="no"
}

onChange={()=>
updateField(
"attending",
"no"
)
}

/>

No

</label>


</div>


</div>





<div>

<label className="label">
Message
</label>


<textarea

rows="5"

className="field"

value={form.message}

onChange={
e=>updateField(
"message",
e.target.value
)
}

/>


</div>






<button

disabled={status==="loading"}

className="
button-primary
w-full
"

>


{
status==="loading"

?

<>

<LoaderCircle
className="animate-spin"
/>

Sending

</>

:

<>

<Heart size={16}/>

Send RSVP

</>

}


</button>



</form>

)}



</div>




</div>


</SectionReveal>




<GuestCheckerModal

open={modalOpen}

onClose={()=>setModalOpen(false)}

guestList={guestList}

onConfirmed={confirmGuest}

/>



</section>


);


}