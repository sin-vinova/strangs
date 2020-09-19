import React from 'react'
import { useRouter } from 'next/router'

export default function Course() {
    const router = useRouter();
    console.log('router', router)

    const [ course, teacherName ] = router?.query?.course?.toString().split('-') || [];
    return (
        <div>
            Hello Course {course} by {teacherName}
        </div>
    )
}